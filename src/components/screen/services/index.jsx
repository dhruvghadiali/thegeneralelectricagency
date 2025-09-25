import { useEffect, useState, useRef } from "react";
import ServicesSectionCardComponent from "@ScreenComponents/services/servicesSectionCardComponent";
import ServicesSectionHeadingComponent from "@ScreenComponents/services/servicesSectionHeadingComponent";

const ServicesIntroComponent = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const servicesData = [
    {
      label: "Pile Foundation",
      description: "Transfer building loads to deeper, stronger soil layers.",
      fullDescription:
        "Our pile foundation solutions provide reliable support for structures by transferring loads to stable soil or rock layers deep beneath the surface.",
      features: [
        "Bored Cast-In-Situ Pile",
        "Auger Pile",
        "Micropiles",
        "Foundation Design",
      ],
    },
    {
      label: "Pile Testing Solutions",
      description: "Evaluate the load-bearing capacity of piles.",
      fullDescription:
        "Comprehensive pile testing services to verify structural integrity and load-bearing capacity using state-of-the-art testing equipment.",
      features: [
        "Static Load Testing",
        "Dynamic Testing",
        "Integrity Testing",
        "Quality Assurance",
      ],
    },
    {
      label: "Rentals",
      description: "Provide equipment and machinery for construction projects.",
      fullDescription:
        "Complete equipment rental solutions for construction projects with well-maintained machinery and expert technical support.",
      features: ["Hydraulic Machinery", "Axiax Fiori Concrete Mixer"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate cards with staggered delay
            servicesData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      {
        threshold: 0.2,
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
      id="services"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <ServicesSectionHeadingComponent hasAnimated={hasAnimated} />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {servicesData.map((service, index) => (
            <ServicesSectionCardComponent
              index={index}
              service={service}
              visibleCards={visibleCards}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesIntroComponent;
