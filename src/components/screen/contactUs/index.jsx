
import ContactUsIntroductionComponent from "@ScreenComponents/contactUs/introductionComponent";
import ContactUsCardComponent from "@ScreenComponents/contactUs/contactUsCard";

function ContactUsScreenComponent() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-gray-900" id="contact-us">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <ContactUsIntroductionComponent />

        {/* Contact Information Section */}
        <ContactUsCardComponent/>
      </div>
    </section>
  );
}

export default ContactUsScreenComponent;
