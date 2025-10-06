import {
  Building2,
} from "lucide-react";

import AddressComponent from "@ScreenComponents/contactUs/contactUsCard/addressComponent";
import ContactNumberComponent from "@ScreenComponents/contactUs/contactUsCard/contactNumberComponent";
import EmailAddressComponent from "@ScreenComponents/contactUs/contactUsCard/emailAddressComponent";
import BusinessHoursComponent from "@ScreenComponents/contactUs/contactUsCard/businessHoursComponent";

const ContactUsCardComponent = () => {
  return (
    <div className="mb-16">
      {/* Single Contact Card with All Information */}
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-50"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Get in touch with our team
              </p>
            </div>
          </div>

          <AddressComponent />
          <ContactNumberComponent />
          <EmailAddressComponent/>
          <BusinessHoursComponent/>
        </div>
      </div>
    </div>
  );
};

export default ContactUsCardComponent;
