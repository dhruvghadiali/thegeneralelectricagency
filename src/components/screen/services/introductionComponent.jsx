import {
  CircuitBoard,
  Zap,
  Droplets,
  Cog,
  Cable,
  Wrench,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

const ServicesIntroductionComponent = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Comprehensive electrical solutions tailored to meet your industrial
            and commercial needs. From high-performance motors to precision
            drives, we deliver excellence across all service categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Quality Assured
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ISO certified products with rigorous quality control
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Expert Support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              24/7 technical assistance from certified engineers
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Fast Delivery
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quick turnaround times with nationwide coverage
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Proven Track Record
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Over 1000+ successful installations nationwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntroductionComponent;
