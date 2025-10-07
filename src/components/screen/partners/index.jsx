import { useState } from 'react';
import { Building2, Award, Users, Zap, Globe, Phone, Mail, MapPin } from 'lucide-react';

import PartnersIntroductionComponent from '@ScreenComponents/partners/introductionComponent';

// Import partner company icons
import cgIcon from '@/assets/images/cg-icon.png';
import kegIcon from '@/assets/images/keg-icon.png';
import premiumIcon from '@/assets/images/premium-transmission-icon.png';

const PartnersScreenComponent = () => {
  const [activePartner, setActivePartner] = useState(0);

  const partners = [
    {
      id: 1,
      name: "CG Power and Industrial Solutions",
      shortName: "CG Power",
      type: "Power & Industrial Solutions",
      logo: "CG",
      image: cgIcon,
      description: "Leading manufacturer of electrical equipment, power systems, and industrial solutions across India and global markets.",
      specialization: ["Power Transformers", "Industrial Motors", "Switchgear", "Railway Solutions"],
      partnership: "Authorized Dealer",
      since: "1939",
      products: "Motors, Drives, Pumps",
      coverage: "Pan India",
      highlights: [
        "₹8,000+ Cr Revenue Company",
        "60+ Manufacturing Locations",
        "Global Presence in 30+ Countries",
        "ISO 9001:2015 Certified"
      ],
      contact: {
        website: "www.cgglobal.com",
        phone: "+91-11-4243-4243",
        email: "info@cgpower.com"
      },
      stats: {
        revenue: "8000+ Cr",
        locations: "60+",
        countries: "30+",
        experience: "100+ Years"
      }
    },
    {
      id: 2,
      name: "RPG Cables KEC International Ltd",
      shortName: "RPG KEC",
      type: "Cables & Infrastructure",
      logo: "RPG",
      image: kegIcon,
      description: "Premier infrastructure EPC company specializing in power transmission, cables, and railway electrification projects.",
      specialization: ["Power Cables", "Transmission Lines", "Railway Electrification", "Infrastructure EPC"],
      partnership: "Channel Partner",
      since: "2015",
      products: "Cables",
      coverage: "Western & Central India",
      highlights: [
        "₹12,000+ Cr Revenue Company",
        "Global Infrastructure Projects",
        "Advanced Cable Technology",
        "Green Energy Solutions"
      ],
      contact: {
        website: "www.kecrpg.com",
        phone: "+91-22-6661-1111",
        email: "info@kecrpg.com"
      },
      stats: {
        revenue: "12000+ Cr",
        projects: "1000+",
        countries: "25+",
        experience: "50+ Years"
      }
    },
    {
      id: 3,
      name: "Premium Transmission Limited",
      shortName: "Premium",
      type: "Transmission Solutions",
      logo: "PTL",
      image: premiumIcon,
      description: "Specialized transmission equipment manufacturer focusing on power distribution and industrial automation solutions.",
      specialization: ["Gear Boxes", "Power Transmission", "Industrial Drives", "Automation Systems"],
      partnership: "Exclusive Distributor",
      since: "2018",
      products: "Gear Boxes, Gear motors",
      coverage: "Gujarat & Rajasthan",
      highlights: [
        "Premium Quality Standards",
        "Advanced Manufacturing",
        "Custom Solutions",
        "24/7 Technical Support"
      ],
      contact: {
        website: "www.premiumtransmission.com",
        phone: "+91-79-2658-5555",
        email: "info@premiumtransmission.com"
      },
      stats: {
        products: "500+",
        clients: "200+",
        states: "5+",
        experience: "15+ Years"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background" id="partners">
      {/* Hero Section */}
      <PartnersIntroductionComponent/>

      {/* Partners Navigation */}
      <section className="">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner, index) => (
              <button
                key={partner.id}
                onClick={() => setActivePartner(index)}
                className={`flex items-center gap-3 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activePartner === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-secondary text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center p-1">
                  <img 
                    src={partner.image} 
                    alt={`${partner.shortName} icon`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center text-primary text-xs font-bold">
                    {partner.logo}
                  </div>
                </div>
                <span className="hidden sm:inline">{partner.shortName}</span>
                <span className="sm:hidden text-xs">{partner.logo}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Partner Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`transition-all duration-500 ${
                  activePartner === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'
                }`}
                style={{ display: activePartner === index ? 'block' : 'none' }}
              >
                {/* Partner Header */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 border border-primary/10">
                  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-100 p-2">
                          <img 
                            src={partner.image} 
                            alt={`${partner.name} logo`}
                            className="w-full h-full object-contain max-w-full max-h-full"
                            style={{ imageRendering: 'auto' }}
                            onError={(e) => {
                              // Fallback to text logo if image fails
                              console.log('Partner image failed to load:', partner.image);
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden w-full h-full items-center justify-center text-primary text-xl font-bold bg-primary/10 rounded-lg">
                            {partner.logo}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">{partner.name}</h2>
                          <p className="text-primary font-medium text-sm sm:text-base">{partner.type}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{partner.description}</p>
                    </div>
                  </div>
                </div>

                {/* Partnership Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                  {/* Partnership Info */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">Partnership Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground text-sm">Type:</span>
                        <span className="font-medium text-primary text-sm text-right">{partner.partnership}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">Since:</span>
                        <span className="font-medium text-sm">{partner.since}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-muted-foreground text-sm">Coverage:</span>
                        <span className="font-medium text-sm text-right">{partner.coverage}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-muted-foreground text-sm">Products:</span>
                        <p className="font-medium text-sm mt-1">{partner.products}</p>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-secondary" />
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">Specializations</h3>
                    </div>
                    <div className="space-y-2">
                      {partner.specialization.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersScreenComponent;
