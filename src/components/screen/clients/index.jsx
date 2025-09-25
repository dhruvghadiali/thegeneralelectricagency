import { useEffect, useState, useRef } from "react";
import { Star, Building, Settings } from "lucide-react";

import ClientsSectionComponent from "@ScreenComponents/clients/clientsSectionComponent";
import ClientsSectionStatsComponent from "@ScreenComponents/clients/clientsSectionStatsComponent";
import ClientsSectionHeadingComponent from "@ScreenComponents/clients/clientsSectionHeadingComponent";

const ClientsIntroComponent = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { number: "150+", label: "Completed Projects", icon: Building },
    { number: "50+", label: "Happy Clients", icon: Star },
    { number: "15+", label: "Years Experience", icon: Settings },
  ];

  const clientsData = [
    {
      name: "Industrial Solutions",
      logo: "🏭",
      category: "Industrial Construction",
      projects: "50+ Projects",
      description:
        "Specialized in industrial facilities, warehouses, and manufacturing plants construction.",
      testimonial:
        "Their rental equipment and technical support kept our factory construction on schedule. Highly recommended.",
    },
    {
      name: "Green Energy",
      logo: "⚡",
      category: "Renewable Energy",
      projects: "10+ Projects",
      description:
        "Leading renewable energy company developing wind farms and solar installations.",
      testimonial:
        "Exceptional foundation work for our wind turbine installations. Their deep foundation expertise is world-class.",
    },
    {
      name: "Public Works Authority",
      logo: "🏛️",
      category: "Government Projects",
      projects: "40+ Projects",
      description:
        "Government agency responsible for public infrastructure and municipal construction projects.",
      testimonial:
        "Reliable partner for all our public infrastructure projects. Their pile testing solutions ensure long-lasting structures.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate stats first
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
              }, index * 150);
            });

            // Then animate client cards
            setTimeout(() => {
              clientsData.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleCards((prev) => [...prev, index]);
                }, index * 200);
              });
            }, 600);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
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
      id="clients"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <ClientsSectionHeadingComponent hasAnimated={hasAnimated} />

        {/* Stats Section */}
        <ClientsSectionStatsComponent
          visibleStats={visibleStats}
          stats={stats}
        />

        {/* Clients Grid */}
        <ClientsSectionComponent
          clientsData={clientsData}
          visibleCards={visibleCards}
        />
      </div>
    </section>
  );
};

export default ClientsIntroComponent;
