import { useEffect, useState } from "react";
import NavigationMenuComponent from "@Components/navigationMenu";
import HomeScreenComponent from "@ScreenComponents/home";
import ServicesIntroComponent from "@ScreenComponents/services";
import ClientsIntroComponent from "@ScreenComponents/clients";
import EquipmentIntroComponent from "@ScreenComponents/equipment";
import AwardsIntroComponent from "@ScreenComponents/awards";
import ProjectsIntroComponent from "@ScreenComponents/projects";
import AboutUsIntroComponent from "@ScreenComponents/aboutus";

export default function HomePage() {
  // const [isPageLoaded, setIsPageLoaded] = useState(false);

  // useEffect(() => {
  //   // Trigger page load animation
  //   const timer = setTimeout(() => {
  //     setIsPageLoaded(true);
  //   }, 100); // Small delay for smooth transition

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div>
      {/* Navigation - sticky header outside of animated container */}
      <NavigationMenuComponent />

      {/* Main content with page load animations */}
      {/* <div className={`transition-all duration-1000 ease-out ${
        isPageLoaded 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}> */}

      {/* Home content with fade up animation */}
      {/* <div className={`transition-all duration-1000 delay-400 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}> */}
          <HomeScreenComponent />
        {/* </div> */}

      {/* Services section */}
      {/* <div className={`transition-all duration-1000 delay-600 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}> */}
          <ServicesIntroComponent />
        {/* </div> */}

      {/* Clients section */}
      {/* <div className={`transition-all duration-1000 delay-800 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}> */}
          <ClientsIntroComponent />
        {/* </div> */}

      {/* Equipment section */}
      {/* <div className={`transition-all duration-1000 delay-1000 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <EquipmentIntroComponent />
        </div> */}

      {/* Awards section */}
      {/* <div className={`transition-all duration-1000 delay-1200 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>*/}
          <AwardsIntroComponent />
        {/*</div> */}

      {/* Projects section */}
      {/* <div className={`transition-all duration-1000 delay-1400 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          <ProjectsIntroComponent />
        </div> */}

      {/* About Us section */}
      {/* <div className={`transition-all duration-1000 delay-1600 ease-out  ${
          isPageLoaded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>*/}
          <AboutUsIntroComponent />
         {/*</div> */}
      {/* </div> */}
    </div>
  );
}
