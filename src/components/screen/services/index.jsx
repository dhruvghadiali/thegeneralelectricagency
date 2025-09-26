import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  CircuitBoard, 
  Zap, 
  Droplets, 
  Cog, 
  Cable, 
  Wrench,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'cg-motors',
      title: 'CG Motors',
      description: 'High-performance electric motors designed for industrial applications with superior efficiency and reliability.',
      icon: CircuitBoard,
      features: [
        'Energy efficient designs',
        'Wide range of power ratings',
        'Robust construction',
        'Low maintenance requirements'
      ],
      benefits: [
        'Reduced operational costs',
        'Enhanced productivity',
        'Long service life',
        'Industry compliance'
      ],
      applications: ['Manufacturing', 'Process Industries', 'Infrastructure', 'Commercial Buildings']
    },
    {
      id: 'drives',
      title: 'Drives',
      description: 'Advanced variable frequency drives and motor control solutions for precise speed and torque control.',
      icon: Zap,
      features: [
        'Variable speed control',
        'Energy optimization',
        'Advanced protection',
        'Remote monitoring'
      ],
      benefits: [
        'Energy savings up to 50%',
        'Improved process control',
        'Reduced mechanical stress',
        'Enhanced system reliability'
      ],
      applications: ['HVAC Systems', 'Conveyor Belts', 'Pumps & Fans', 'Industrial Automation']
    },
    {
      id: 'pumps',
      title: 'Pumps',
      description: 'Comprehensive range of pumps including centrifugal, submersible, and specialty pumps for various applications.',
      icon: Droplets,
      features: [
        'Corrosion resistant materials',
        'High efficiency impellers',
        'Multiple configurations',
        'Easy maintenance design'
      ],
      benefits: [
        'Reliable fluid handling',
        'Low operational costs',
        'Minimal downtime',
        'Versatile applications'
      ],
      applications: ['Water Supply', 'Irrigation', 'Industrial Processing', 'Building Services']
    },
    {
      id: 'gear-boxes',
      title: 'Gear Boxes',
      description: 'Premium quality gearboxes offering precise torque multiplication and speed reduction for various mechanical systems.',
      icon: Cog,
      features: [
        'High torque capacity',
        'Precision engineering',
        'Multiple ratios available',
        'Compact design'
      ],
      benefits: [
        'Enhanced power transmission',
        'Smooth operation',
        'Long operational life',
        'Cost-effective solutions'
      ],
      applications: ['Conveyors', 'Mixers', 'Crushers', 'Material Handling']
    },
    {
      id: 'cables',
      title: 'Cables',
      description: 'High-quality electrical cables and wiring solutions designed for safe and efficient power transmission.',
      icon: Cable,
      features: [
        'Fire retardant properties',
        'Multiple conductor options',
        'Weather resistant',
        'Industry standard compliance'
      ],
      benefits: [
        'Safe power transmission',
        'Reduced installation time',
        'Long-term reliability',
        'Cost-effective solutions'
      ],
      applications: ['Power Distribution', 'Control Systems', 'Instrumentation', 'Building Wiring']
    },
    {
      id: 'spares',
      title: 'Spares',
      description: 'Comprehensive inventory of genuine spare parts and components to ensure continuous operation of your equipment.',
      icon: Wrench,
      features: [
        'Genuine OEM parts',
        'Quick availability',
        'Quality assurance',
        'Technical support'
      ],
      benefits: [
        'Minimized downtime',
        'Equipment longevity',
        'Maintained warranties',
        'Expert guidance'
      ],
      applications: ['Preventive Maintenance', 'Emergency Repairs', 'Equipment Upgrades', 'Performance Enhancement']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Comprehensive electrical solutions tailored to meet your industrial and commercial needs. 
              From high-performance motors to precision drives, we deliver excellence across all service categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Range of Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive portfolio of electrical products and services designed to power your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary/20 transform hover:-translate-y-2"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Icon and Title */}
                    <div className="text-center mb-6">
                      <div className="inline-flex w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-center leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider text-center">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications Tags */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {service.applications.slice(0, 3).map((app, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-secondary/20 to-primary/20 text-primary text-xs font-semibold rounded-full border border-primary/20"
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

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Decades of expertise combined with cutting-edge technology to deliver unmatched value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">ISO certified products with rigorous quality control</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-sm text-gray-600">24/7 technical assistance from certified engineers</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Quick turnaround times with nationwide coverage</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Track Record</h3>
              <p className="text-sm text-gray-600">Over 1000+ successful installations nationwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              Ready to Power Your Next Project?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-primary-foreground/90">
              Contact our experts today to discuss your specific requirements and discover how our services can benefit your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-8">
                Get Quote Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 border-white text-white hover:bg-white hover:text-primary">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Services;