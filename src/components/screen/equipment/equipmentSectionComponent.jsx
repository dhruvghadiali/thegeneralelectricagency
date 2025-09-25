import { Wrench, Shield } from "lucide-react";

const EquipmentSectionComponent = ({ equipmentData, visibleCards }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
      {equipmentData.map((equipment, index) => (
        <div
          key={index}
          className={`group transition-all duration-700 ease-out transform ${
            visibleCards.includes(index)
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="bg-white dark:bg-slate-800 hover:cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600 group-hover:-translate-y-2">
            {/* Equipment Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-4xl sm:text-5xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {equipment.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors duration-300">
                      {equipment.name}
                    </h3>
                    <p className="text-sm sm:text-base text-orange-600 dark:text-orange-400 font-medium mb-1">
                      {equipment.category}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Model: {equipment.model}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {equipment.description}
              </p>
            </div>

            {/* Equipment Details */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Specifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Wrench className="w-5 h-5 mr-2 text-orange-500" />
                  Specifications
                </h4>
                <div className="space-y-2 h-32">
                  {equipment.specifications.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className={`flex items-center transition-all duration-500 ${
                        visibleCards.includes(index)
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                      style={{
                        transitionDelay: `${index * 200 + specIndex * 100}ms`,
                      }}
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {spec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-500" />
                  Applications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {equipment.applications.map((app, appIndex) => (
                    <span
                      key={appIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentSectionComponent;
