import { useEffect, useState, useRef } from "react";
import { Users, Target, Award, Heart, Lightbulb, Shield, Globe, Handshake } from "lucide-react";

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
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-8 sm:p-12 border-l-4 border-orange-500">
              <p className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 italic">
                "Building foundations that last generations, with safety and innovation as our cornerstone principles."
              </p>
              <p className="text-lg text-orange-600 dark:text-orange-400 mt-4 font-medium">
                - Pareshkumar Pipariya, Founder & CEO
              </p>
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12 mb-16 sm:mb-20 md:mb-24">
          {companyStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ease-out transform ${
                  visibleElements.stats.includes(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Company Values */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
            hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core <span className="text-orange-500">Values</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide every decision we make and every project we undertake.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 ease-out transform ${
                    visibleElements.values.includes(index)
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 h-full border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className={`bg-gradient-to-r ${value.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
            hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our <span className="text-orange-500">Leadership Team</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced professionals leading the way in foundation engineering and construction excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ease-out transform ${
                  visibleElements.team.includes(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h4>
                  <p className="text-orange-600 dark:text-orange-400 font-semibold mb-2">
                    {member.position}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {member.experience} • {member.specialization}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <div className={`text-center mb-12 transition-all duration-1000 ease-out ${
            hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-orange-500">Journey</span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones that have shaped our growth and success over the years.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-500"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative pl-12 transition-all duration-700 ease-out transform ${
                    visibleElements.milestones.includes(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400 mr-4">
                        {milestone.year}
                      </span>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {milestone.event}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center transition-all duration-1000 ease-out ${
          hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 sm:p-10 md:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Partner with <span className="text-amber-200">Industry Leaders</span>
            </h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
              Join the growing number of clients who trust Patel Machinery for their most critical 
              foundation engineering projects. Experience the difference expertise makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Join Our Team
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 sm:px-12 rounded-xl transition-all duration-300 text-lg flex items-center">
                <Handshake className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsIntroComponent;
