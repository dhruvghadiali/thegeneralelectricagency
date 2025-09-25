import { useRef } from "react";

const ServicesSectionCardComponent = ({ service, visibleCards, index }) => {
  const cardsRef = useRef([]);

  return (
    <div
      key={index}
      ref={(el) => (cardsRef.current[index] = el)}
      className={`group transition-all duration-700 ease-out transform ${
        visibleCards.includes(index)
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl hover:cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 p-8 sm:p-10 md:p-12 h-full border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600">
        {/* Service Header */}
        <div className="flex items-start justify-between mb-6 lg:h-52">
          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors duration-300">
              {service.label}
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 md:line-clamp-4">
              {service.fullDescription}
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Key Features:
          </h4>
          {service.features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className={`flex items-center transition-all duration-500 ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{
                transitionDelay: `${index * 200 + featureIndex * 100}ms`,
              }}
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-4 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300 text-base sm:text-lg">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSectionCardComponent;
