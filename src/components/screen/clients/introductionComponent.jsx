import { Building2, Award, Users, CheckCircle } from "lucide-react";

const ClientsIntroductionComponent = () => {
  const stats = [
    { number: "500+", label: "Happy Clients", icon: Users },
    { number: "1000+", label: "Projects Completed", icon: CheckCircle },
    { number: "50+", label: "Industries Served", icon: Building2 },
    { number: "25+", label: "Years Experience", icon: Award },
  ];

  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-primary">Clients</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Trusted by leading companies across India. We've delivered
            exceptional electrical solutions to over 500+ satisfied clients,
            building lasting partnerships through quality and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 dark:group-hover:from-primary/30 dark:group-hover:to-secondary/30 transition-colors duration-300">
                  <IconComponent className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientsIntroductionComponent;
