const EquipmentSectionStatsComponent = ({ equipmentStats, visibleStats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-16 sm:mb-20 md:mb-24">
      {equipmentStats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={index}
            className={`text-center transition-all duration-700 ease-out transform ${
              visibleStats.includes(index)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {stat.number}
            </div>
            <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EquipmentSectionStatsComponent;
