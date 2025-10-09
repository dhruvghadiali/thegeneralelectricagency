import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesCardComponent = ({ service }) => {
  const IconComponent = service.icon;
  
  return (
    <div
      key={service.id}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40 transform hover:-translate-y-2"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Card Content */}
      <div className="relative p-8">
        {/* Icon and Title */}
        <div className="text-center mb-6">
          <div className="inline-flex w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-6 text-sm">
          {service.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider text-center">
            Key Features
          </h4>
          <div className="space-y-2">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Tags */}
        <div className="mb-6 h-16">
          <div className="flex flex-wrap gap-2 justify-center">
            {service.applications.map((app, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gradient-to-r from-secondary/20 to-primary/20 dark:from-secondary/30 dark:to-primary/30 text-primary dark:text-primary text-xs font-semibold rounded-full border border-primary/20 dark:border-primary/30"
              >
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            size="lg"
          >
            <span className="flex items-center justify-center">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesCardComponent;
