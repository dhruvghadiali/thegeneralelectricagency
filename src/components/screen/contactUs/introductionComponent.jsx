import moment from "moment";

const ContactUsIntroductionComponent = () => {
  const currentYear = moment().year();
  const yearsInBusiness = currentYear - 1939;

  return (
    <div className="text-center mb-16 sm:mb-20 md:mb-24">
      <div className={`transition-all duration-1000 ease-out`}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Contact <span className="text-primary">Us</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
          {`For over ${yearsInBusiness} years, The General Electric Agency has been a trusted partner in 
          electrical solutions, providing premium motors, drives, pumps, and industrial equipment 
          that power the industries of today and tomorrow.`}
        </p>
      </div>
    </div>
  );
};

export default ContactUsIntroductionComponent;
