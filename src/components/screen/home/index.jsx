import homeBackground from "@/assets/images/home.jpeg";
import HomeScreenSectionOneComponent from "@ScreenComponents/home/homeScreenSectionOneComponent";
import HomeScreenSectionTwoComponent from "@ScreenComponents/home/homeScreenSectionTwoComponent";
import HomeScreenSectionThreeComponent from "@ScreenComponents/home/homeScreenSectionThreeComponent";

function HomeScreenComponent() {
  return (
    <div
      id="home"
      className="w-full relative flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat md:bg-fixed bg-scroll"
      style={{
        backgroundImage: `url(${homeBackground})`,
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Responsive overlay for better text readability based on theme and device */}
      <div
        className="absolute inset-0 
          bg-black/70 
          dark:bg-black/85 
          sm:bg-black/65
          md:bg-black/60 
          lg:bg-black/55 
          xl:bg-black/50
          dark:sm:bg-black/80
          dark:md:bg-black/75 
          dark:lg:bg-black/70 
          dark:xl:bg-black/65
        "
      />

      {/* Content with responsive spacing */}
      <div
        className="relative z-10 flex flex-col items-center justify-center 
          px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
          py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28
          max-w-7xl mx-auto w-full text-white
          h-full
        "
      >
        <HomeScreenSectionOneComponent />
        <HomeScreenSectionTwoComponent />
        <HomeScreenSectionThreeComponent />
      </div>
    </div>
  );
}

export default HomeScreenComponent;
