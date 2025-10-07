import NavigationMenuComponent from "@Components/navigationMenu";
import HomeScreenComponent from "@ScreenComponents/home";
import ServicesIntroComponent from "@ScreenComponents/services";
import ClientsIntroComponent from "@ScreenComponents/clients";
import PartnersScreenComponent from "@ScreenComponents/partners";
import ContactUsScreenComponent from "@ScreenComponents/contactUs";
import AboutUsScreenComponent from "@ScreenComponents/about";

export default function HomePage() {
  return (
    <div>
      <NavigationMenuComponent useLink={false}/>
      <HomeScreenComponent />
      <ServicesIntroComponent />
      <ClientsIntroComponent />
      <PartnersScreenComponent />
      <ContactUsScreenComponent />
    </div>
  );
}
