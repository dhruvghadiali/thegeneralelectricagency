import NavigationMenuComponent from "@Components/navigationMenu";
import AboutScreenComponent from "@/components/screen/about";

function AboutPage() {
  return (
    <>
      <NavigationMenuComponent useLink={true}/>
      <AboutScreenComponent />
    </>
  );
}

export default AboutPage;
