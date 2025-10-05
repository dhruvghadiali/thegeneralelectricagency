import { Factory, Zap, Pill, FlaskConical } from "lucide-react";

const ClientsIndustriesCardComponent = () => {
  const industries = [
    { name: "Chemical", count: 85, icon: FlaskConical, growth: "+15%" },
    { name: "Pharmaceutical", count: 120, icon: Pill, growth: "+22%" },
    { name: "Power & Energy", count: 45, icon: Zap, growth: "+18%" },
    { name: "Manufacturing", count: 110, icon: Factory, growth: "+20%" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {industries.map((industry, index) => {
          const IconComponent = industry.icon;
          return (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="flex items-center gap-6 mb-6 h-24">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300 group-hover:scale-110">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-1">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {industry.count}+ Projects
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-bold mb-1">
                      {industry.growth}
                    </div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700 group-hover:from-primary/80 group-hover:to-secondary/80 relative overflow-hidden"
                    style={{
                      width: `${Math.min((industry.count / 120) * 100, 100)}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Projects Completed</span>
                  <span className="font-semibold">{industry.count}+</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsIndustriesCardComponent;
