import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Building2,
  Zap
} from 'lucide-react';

const Awards = () => {
  const awards = [
    {
      id: 1,
      title: 'Best Electrical Solutions Provider 2024',
      organization: 'India Electrical Industry Association',
      year: '2024',
      category: 'Industry Excellence',
      description: 'Recognized for outstanding contribution to electrical infrastructure development across multiple industries.',
      icon: Trophy,
      color: 'from-amber-500 to-orange-500',
      location: 'Mumbai, India'
    },
    {
      id: 2,
      title: 'Innovation in Motor Technology Award',
      organization: 'National Manufacturing Council',
      year: '2023',
      category: 'Technology Innovation',
      description: 'Awarded for implementing cutting-edge motor solutions that achieved 30% energy efficiency improvements.',
      icon: Zap,
      color: 'from-blue-500 to-indigo-600',
      location: 'New Delhi, India'
    },
    {
      id: 3,
      title: 'Quality Excellence Certificate',
      organization: 'Bureau of Indian Standards',
      year: '2024',
      category: 'Quality Assurance',
      description: 'Certified for maintaining highest quality standards in electrical products and services.',
      icon: Shield,
      color: 'from-emerald-500 to-teal-600',
      location: 'Chennai, India'
    },
    {
      id: 4,
      title: 'Customer Satisfaction Award',
      organization: 'Indian Chamber of Commerce',
      year: '2023',
      category: 'Service Excellence',
      description: 'Recognized for achieving 98% customer satisfaction rating across all service categories.',
      icon: Users,
      color: 'from-purple-500 to-violet-600',
      location: 'Kolkata, India'
    },
    {
      id: 5,
      title: 'Sustainable Business Practices Award',
      organization: 'Green Business Council',
      year: '2024',
      category: 'Sustainability',
      description: 'Honored for implementing eco-friendly practices and promoting sustainable electrical solutions.',
      icon: Award,
      color: 'from-green-500 to-emerald-600',
      location: 'Bengaluru, India'
    },
    {
      id: 6,
      title: 'Export Excellence Recognition',
      organization: 'Export Promotion Council',
      year: '2023',
      category: 'International Trade',
      description: 'Acknowledged for significant contribution to electrical equipment exports and international partnerships.',
      icon: TrendingUp,
      color: 'from-red-500 to-pink-600',
      location: 'Mumbai, India'
    }
  ];

  const certifications = [
    {
      name: 'ISO 9001:2015',
      type: 'Quality Management System',
      validity: 'Valid till 2027',
      icon: CheckCircle
    },
    {
      name: 'ISO 14001:2015',
      type: 'Environmental Management',
      validity: 'Valid till 2026',
      icon: Shield
    },
    {
      name: 'OHSAS 18001',
      type: 'Occupational Health & Safety',
      validity: 'Valid till 2025',
      icon: Users
    },
    {
      name: 'CE Marking',
      type: 'European Conformity',
      validity: 'Permanent',
      icon: Award
    }
  ];

  const achievements = [
    { number: '15+', label: 'Awards Won', description: 'Industry recognitions' },
    { number: '8+', label: 'Certifications', description: 'Quality standards' },
    { number: '25+', label: 'Years', description: 'Industry experience' },
    { number: '98%', label: 'Satisfaction', description: 'Customer rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Trophy className="h-4 w-4" />
              Award Winning Company
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-primary">Awards</span> & Recognition
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Celebrating excellence in electrical solutions. Our commitment to quality, innovation, 
              and customer satisfaction has earned us prestigious awards and certifications from leading industry bodies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8">
                View All Awards
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Download Certificates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Stats */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                  <Trophy className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                  {achievement.number}
                </div>
                <div className="text-sm lg:text-base text-gray-900 font-semibold mb-1">{achievement.label}</div>
                <div className="text-xs lg:text-sm text-gray-600">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Prestigious Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedication to excellence has been recognized by leading industry organizations and regulatory bodies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => {
              const IconComponent = award.icon;
              return (
                <div 
                  key={award.id}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 transform hover:-translate-y-3"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  }}
                >
                  {/* Award Header with Gradient */}
                  <div className={`p-8 bg-gradient-to-r ${award.color} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{award.year}</div>
                          <div className="text-sm opacity-90">{award.category}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 leading-tight">
                        {award.title}
                      </h3>
                      <p className="text-white/90 text-sm font-medium">
                        {award.organization}
                      </p>
                    </div>
                  </div>

                  {/* Award Details */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{award.location}</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {award.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        View Certificate
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quality Certifications
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality is validated by internationally recognized certifications and standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {cert.type}
                  </p>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {cert.validity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey of Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A timeline of our major achievements and milestones in the electrical industry.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full hidden lg:block"></div>

            <div className="space-y-12">
              {awards.slice(0, 4).map((award, index) => {
                const IconComponent = award.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={award.id} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg hidden lg:block z-10"></div>
                    
                    <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${award.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                                {award.year}
                              </span>
                              <span className="text-gray-500 text-sm">{award.category}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {award.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3">
                              {award.description}
                            </p>
                            <p className="text-primary font-medium text-sm">
                              {award.organization}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Medal className="h-4 w-4" />
              Award Winning Excellence
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6">
              Experience Award-Winning Service
            </h2>
            <p className="text-lg sm:text-xl mb-10 text-white/90 leading-relaxed">
              Partner with an industry leader recognized for excellence, innovation, and customer satisfaction. 
              Let our award-winning team deliver exceptional electrical solutions for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="text-base px-10 py-4 bg-white text-primary hover:bg-gray-100 font-semibold">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-primary font-semibold">
                View All Certificates
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
