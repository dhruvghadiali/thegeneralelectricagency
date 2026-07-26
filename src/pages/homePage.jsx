import ShowcaseScrollNavigation from "@/components/ShowcaseScrollNavigation";
import HomeScreenComponent from "@ScreenComponents/home";
import ServicesIntroComponent from "@ScreenComponents/services";
import ClientsIntroComponent from "@ScreenComponents/clients";
import PartnersScreenComponent from "@ScreenComponents/partners";
import ContactUsScreenComponent from "@ScreenComponents/contactUs";
import { lazy, Suspense, useEffect, useState } from "react";

const MotorScrollAnimation = lazy(
  () => import("@/components/MotorScrollAnimation"),
);

const showcaseSections = [
  { id: "home", Component: HomeScreenComponent },
  { id: "services", Component: ServicesIntroComponent },
  { id: "clients", Component: ClientsIntroComponent },
  { id: "partners", Component: PartnersScreenComponent },
  { id: "contact-us", Component: ContactUsScreenComponent },
];

export default function HomePage() {
  const [activeShowcaseSection, setActiveShowcaseSection] = useState("home");
  const [isShowcaseNavigationRevealed, setIsShowcaseNavigationRevealed] =
    useState(false);
  const [isHomeFreezeActive, setIsHomeFreezeActive] = useState(false);
  const renderedShowcaseSection = isShowcaseNavigationRevealed
    ? activeShowcaseSection
    : null;
  const ActiveShowcaseComponent = showcaseSections.find(
    ({ id }) => id === renderedShowcaseSection,
  )?.Component;

  useEffect(() => {
    let frameId = 0;

    const updateHomeFreeze = () => {
      const shouldFreeze =
        renderedShowcaseSection === "home" &&
        window.scrollY <= window.innerHeight * 0.92;

      setIsHomeFreezeActive(shouldFreeze);
    };

    const queueUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateHomeFreeze);
    };

    updateHomeFreeze();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      window.cancelAnimationFrame(frameId);
    };
  }, [renderedShowcaseSection]);

  return (
    <div className="home-page-with-motor-background">
      <ShowcaseScrollNavigation
        activeSection={activeShowcaseSection}
        onActiveSectionChange={setActiveShowcaseSection}
        onNavigationRevealChange={setIsShowcaseNavigationRevealed}
      />
      <Suspense
        fallback={<div className="h-screen bg-white" aria-hidden="true" />}
      >
        <MotorScrollAnimation
          frameCount={300}
          desktopFramePath="/motor-frames/desktop"
          mobileFramePath="/motor-frames/mobile"
          animationDurationVh={650}
          freezeAnimation={isHomeFreezeActive}
          freezeFrameProgress={0.14}
        >
          {ActiveShowcaseComponent ? (
            <ActiveShowcaseComponent key={renderedShowcaseSection} />
          ) : (
            <div
              className="motor-scroll-animation__foreground-idle"
              aria-hidden="true"
            />
          )}
        </MotorScrollAnimation>
      </Suspense>
    </div>
  );
}
