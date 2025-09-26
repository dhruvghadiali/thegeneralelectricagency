import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Factory, 
  Zap, 
  Award, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Building
} from 'lucide-react';

const Clients = () => {
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: CheckCircle },
    { number: '50+', label: 'Industries Served', icon: Building2 },
    { number: '25+', label: 'Years Experience', icon: Award }
  ];

  const featuredClients = [
    {
      id: 1,
      name: 'Tata Steel Limited',
      industry: 'Steel & Mining',
      location: 'Mumbai, Maharashtra',
      projectValue: '₹50+ Lakhs',
      completedDate: '2024',
      services: ['CG Motors', 'Drives', 'Spares'],
      description: 'Complete electrical solution for steel manufacturing plant including high-performance motors and drive systems.',
      testimonial: 'Outstanding service quality and timely delivery. Their technical expertise helped us achieve 25% energy savings.',
      contactPerson: 'Rajesh Kumar',
      designation: 'Plant Manager',
      rating: 5,
      projectDuration: '6 months'
    },
    {
      id: 2,
      name: 'Larsen & Toubro',
      industry: 'Construction & Engineering',
      location: 'Chennai, Tamil Nadu',
      projectValue: '₹75+ Lakhs',
      completedDate: '2024',
      services: ['Pumps', 'Cables', 'Gear Boxes'],
      description: 'Infrastructure project requiring specialized pumping systems and power distribution solutions.',
      testimonial: 'Reliable partner with excellent technical support. Project completed ahead of schedule.',
      contactPerson: 'Suresh Menon',
      designation: 'Project Director',
      rating: 5,
      projectDuration: '8 months'
    },
    {
      id: 3,
      name: 'Reliance Industries',
      industry: 'Petrochemicals',
      location: 'Jamnagar, Gujarat',
      projectValue: '₹1+ Crore',
      completedDate: '2023',
      services: ['CG Motors', 'Drives', 'Pumps', 'Spares'],
      description: 'Large-scale petrochemical plant automation and electrical equipment installation.',
      testimonial: 'Exceptional quality products and professional service. Long-term partnership continues to deliver value.',
      contactPerson: 'Amit Patel',
      designation: 'Operations Head',
      rating: 5,
      projectDuration: '12 months'
    }
  ];

  const clientLogos = [
    { name: 'Tata Group', category: 'Conglomerate' },
    { name: 'Reliance', category: 'Petrochemicals' },
    { name: 'L&T', category: 'Engineering' },
    { name: 'Adani Group', category: 'Infrastructure' },
    { name: 'Bajaj Group', category: 'Manufacturing' },
    { name: 'Mahindra', category: 'Automotive' },
    { name: 'Godrej', category: 'Consumer Goods' },
    { name: 'Jindal Steel', category: 'Steel' },
    { name: 'NTPC', category: 'Power' },
    { name: 'BHEL', category: 'Heavy Engineering' },
    { name: 'Indian Railways', category: 'Transportation' },
    { name: 'ONGC', category: 'Oil & Gas' }
  ];

  const industries = [
    { name: 'Steel & Mining', count: 85, icon: Building2, growth: '+15%' },
    { name: 'Petrochemicals', count: 45, icon: Factory, growth: '+22%' },
    { name: 'Power & Energy', count: 120, icon: Zap, growth: '+18%' },
    { name: 'Construction', count: 95, icon: Building, growth: '+12%' },
    { name: 'Manufacturing', count: 110, icon: Factory, growth: '+20%' },
    { name: 'Infrastructure', count: 65, icon: Building2, growth: '+25%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Clients</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Trusted by leading companies across India. We've delivered exceptional electrical solutions 
              to over 500+ satisfied clients, building lasting partnerships through quality and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8">
                View Case Studies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Become Our Client
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* Client Logos */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600">
              Some of the prestigious companies we've had the privilege to serve
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center h-28 group hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
              >
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300">
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {client.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our expertise spans across multiple industries, delivering specialized solutions for diverse requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300 group-hover:scale-110">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 mb-1">
                          {industry.name}
                        </h3>
                        <p className="text-gray-600 font-medium">{industry.count} Projects</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600 font-bold mb-1">{industry.growth}</div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700 group-hover:from-primary/80 group-hover:to-secondary/80 relative overflow-hidden"
                        style={{ width: `${Math.min(industry.count / 120 * 100, 100)}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Projects Completed</span>
                      <span className="font-semibold">{industry.count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-lg sm:text-xl mb-10 text-white/90 leading-relaxed">
              Let's discuss how we can help your business achieve its electrical infrastructure goals. 
              Join hundreds of satisfied clients who trust us for their success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-10 py-4 bg-white text-primary hover:bg-gray-100 font-semibold">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
