import { useEffect, useState, useRef } from "react";
import { Users, Target, Award, Heart, Lightbulb, Shield, Globe, Handshake, MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

const teamMembers = [
  {
    name: "Pareshkumar Pipariya",
    position: "Founder & CEO",
    experience: "25+ Years",
    specialization: "Foundation Engineering",
    image: "👨‍💼",
    description: "Visionary leader with over two decades of experience in deep foundation engineering and construction management."
  },
  {
    name: "Subrato Setua",
    position: "Chief Engineer",
    experience: "18+ Years",
    specialization: "Structural Design",
    image: "👩‍🔬",
    description: "Expert in structural analysis and innovative foundation solutions with a focus on sustainable construction practices."
  },
  {
    name: "Rafik Mansuri",
    position: "Operations Director",
    experience: "20+ Years",
    specialization: "Project Management",
    image: "👨‍🏭",
    description: "Operational excellence leader ensuring seamless project execution and maintaining our industry-leading safety standards."
  },
  {
    name: "Akhtar Raza",
    position: "Safety Manager",
    experience: "15+ Years",
    specialization: "Workplace Safety",
    image: "👩‍🦺",
    description: "Dedicated safety professional committed to maintaining zero-incident workplaces across all project sites."
  }
];

const companyValues = [
  {
    icon: Target,
    title: "Excellence",
    description: "Pursuing the highest standards in every project we undertake, from initial planning to final completion.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Prioritizing the safety of our workers, clients, and communities in every aspect of our operations.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing cutting-edge technology and methodologies to deliver superior construction solutions.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Building trust through honest communication, transparent practices, and ethical business conduct.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Heart,
    title: "Community",
    description: "Contributing positively to the communities we serve through responsible construction and local engagement.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Implementing environmentally conscious practices to protect our planet for future generations.",
    color: "from-emerald-500 to-emerald-600"
  }
];

const milestones = [
  { year: "2011", event: "Company Founded", description: "Patel Machinery established with a vision to revolutionize foundation engineering" },
  { year: "2014", event: "First Major Project", description: "Completed Metro Bridge Foundation project, establishing our reputation" },
  { year: "2015", event: "Safety Excellence", description: "Achieved our first 1000 days without workplace incidents" },
  { year: "2018", event: "Technology Innovation", description: "Introduced AI-driven pile testing systems" },
  { year: "2020", event: "Expansion", description: "Expanded operations to serve three major metropolitan areas" },
  { year: "2025", event: "Industry Leadership", description: "Recognized as the leading foundation engineering company in the region" }
];

const companyStats = [
  { number: "15+", label: "Years of Excellence", icon: Award },
  { number: "150+", label: "Projects Completed", icon: Target },
  { number: "50+", label: "Team Members", icon: Users },
  { number: "Zero", label: "Lost Time Incidents", icon: Shield }
];

function AboutUsIntroComponent() {
  const [visibleElements, setVisibleElements] = useState({
    stats: [],
    values: [],
    team: [],
    milestones: []
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate stats first
            companyStats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleElements(prev => ({
                  ...prev,
                  stats: [...prev.stats, index]
                }));
              }, index * 150);
            });

            // Then animate values
            setTimeout(() => {
              companyValues.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleElements(prev => ({
                    ...prev,
                    values: [...prev.values, index]
                  }));
                }, index * 200);
              });
            }, 600);

            // Then team members
            setTimeout(() => {
              teamMembers.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleElements(prev => ({
                    ...prev,
                    team: [...prev.team, index]
                  }));
                }, index * 200);
              });
            }, 1200);

            // Finally milestones
            setTimeout(() => {
              milestones.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleElements(prev => ({
                    ...prev,
                    milestones: [...prev.milestones, index]
                  }));
                }, index * 150);
              });
            }, 1800);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section 
      id="about-us"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 md:mb-24">
          <div className={`transition-all duration-1000 ease-out ${
            hasAnimated 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              About <span className="text-orange-500">Us</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              For over 15 years, Patel Construction has been at the forefront of foundation engineering, 
              delivering innovative solutions that build the infrastructure of tomorrow.
            </p>
            
          </div>
        </div>




       

        {/* Contact Information Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 transition-all duration-1000 ease-out ${
          hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Get In Touch</h3>
            </div>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Head Office Address</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Office No. 123, Business Complex,<br />
                    Industrial Area, Phase-II,<br />
                    Ahmedabad, Gujarat - 380015,<br />
                    India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone Numbers</h4>
                  <p className="text-gray-600">
                    +91 98765 43210<br />
                    +91 79 2658 7412
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email Addresses</h4>
                  <p className="text-gray-600">
                    info@thegeneralelectricagency.com<br />
                    support@thegeneralelectricagency.com
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl shadow-xl p-8 border border-primary/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Company Details</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Established</h4>
                <p className="text-gray-700 text-lg">Since 1999 - Over 25 Years of Excellence</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">GST Number</h4>
                <p className="text-gray-700 font-mono">24XXXXX1234X1Z5</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">PAN Number</h4>
                <p className="text-gray-700 font-mono">XXXXX1234X</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Service Areas</h4>
                <p className="text-gray-700">
                  Gujarat, Rajasthan, Maharashtra, Madhya Pradesh, 
                  and Pan India Service Network
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">ISO 9001:2015</span>
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">CE Certified</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Authorized Dealer</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Quick Response Promise</h4>
                <p className="text-gray-600 text-sm">
                  We respond to all inquiries within 2 hours during business days 
                  and provide 24/7 emergency support for critical electrical issues.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUsIntroComponent;
