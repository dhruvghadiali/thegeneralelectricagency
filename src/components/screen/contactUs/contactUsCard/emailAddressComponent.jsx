import { Mail } from "lucide-react";

const EmailAddressComponent = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent">
      <div className="flex items-start gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div>
          <h5 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
            Email Addresses
          </h5>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Reach out to us via email for detailed inquiries
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <h6 className="font-bold text-gray-900 dark:text-white">
                General Inquiries
              </h6>
            </div>
            <div className="space-y-2">
              <p className="text-primary font-semibold break-all hover:text-primary/80 transition-colors cursor-pointer">
                generalagenc@gmail.com
              </p>
              <p className="text-primary font-semibold break-all hover:text-primary/80 transition-colors cursor-pointer">
                inquiry.generalagenc@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600  overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <h6 className="font-bold text-gray-900 dark:text-white">
                Sales & Marketing Department
              </h6>
            </div>
            <p className="text-primary font-semibold break-all hover:text-secondary/80 transition-colors cursor-pointer">
              abhigandhi.gea@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailAddressComponent;
