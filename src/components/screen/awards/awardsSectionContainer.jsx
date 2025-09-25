const AwardsSectionContainer = ({ awardsData, visibleCards }) => {
  return (
    <div className="grid grid-cols-1  gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-20 md:mb-24">
      {awardsData.map((award, index) => {
        const IconComponent = award.icon;
        return (
          <div
            key={index}
            className={`group transition-all duration-700 ease-out transform ${
              visibleCards.includes(index)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="bg-white dark:bg-gray-800 hover:cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600 group-hover:-translate-y-2 h-full">
              {/* Award Header with Gradient */}
              <div
                className={`bg-gradient-to-r ${award.color} p-6 sm:p-8 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-12 h-12 sm:w-14 sm:h-14 text-white group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-2xl sm:text-3xl font-bold opacity-90">
                      {award.year}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                    {award.title}
                  </h3>
                  <p className="text-sm sm:text-base opacity-90 font-medium">
                    {award.organization}
                  </p>
                </div>
              </div>

              {/* Award Details */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Category Badge */}
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${award.bgColor} ${award.textColor}`}
                >
                  {award.category}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AwardsSectionContainer;
