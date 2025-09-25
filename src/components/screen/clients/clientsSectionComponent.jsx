const ClientsSectionComponent = ({clientsData, visibleCards}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
      {clientsData.map((client, index) => (
        <div
          key={index}
          className={`group transition-all duration-700 ease-out transform ${
            visibleCards.includes(index)
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 hover:cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 sm:p-8 h-full border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600 group-hover:-translate-y-2">
            {/* Client Header */}
            <div className="flex items-center md:h-20 mb-6">
              <div className="text-4xl sm:text-5xl mr-4 group-hover:scale-110 transition-transform duration-300">
                {client.logo}
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors duration-300">
                  {client.name}
                </h3>
                <p className="text-sm sm:text-base text-orange-600 dark:text-orange-400 font-medium">
                  {client.category}
                </p>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex justify-between items-center mb-4 p-3  dark:bg-gray-700 rounded-xl">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {client.projects}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 md:h-28 md:line-clamp-4">
              {client.description}
            </p>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4 sm:p-5 mb-6">
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed italic">
                "{client.testimonial}"
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientsSectionComponent;
