import { Phone } from "lucide-react";

const ContactNumberComponent = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent">
      <div className="flex items-start gap-3 sm:gap-5 mb-6 sm:mb-8">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div>
          <h5 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">
            Contact Numbers
          </h5>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Call us directly for immediate assistance and support
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="relative z-10">
            <div className="space-y-3">
              <div>
                <p className="text-primary font-bold text-lg">+91 9099017416</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mr. Piyush Patel
                </p>
              </div>
              <div>
                <p className="text-primary font-bold text-lg">+91 7874349006</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mr. Harikesh Patel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <div className="relative z-10">
            <div className="space-y-3">
              <div>
                <p className="text-primary font-bold text-lg">+91 9428535603</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mr. Abhi Gandhi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactNumberComponent;
