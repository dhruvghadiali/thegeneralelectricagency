import NavigationMenuComponent from "@Components/navigationMenu";
import HomeScreenComponent from "@ScreenComponents/home";
import ServicesIntroComponent from "@ScreenComponents/services";
import ClientsIntroComponent from "@ScreenComponents/clients";
import PartnersScreenComponent from "@ScreenComponents/partners"
import AboutUsIntroComponent from "@ScreenComponents/aboutus";
import AboutUsScreenComponent from "@ScreenComponents/about";

export default function HomePage() {
  return (
    <div>
      <NavigationMenuComponent />
      <HomeScreenComponent />
      <ServicesIntroComponent />
      <ClientsIntroComponent />
      <PartnersScreenComponent />
      {/* <AboutUsIntroComponent />
      <AboutUsScreenComponent /> */}
    </div>
  );
}
