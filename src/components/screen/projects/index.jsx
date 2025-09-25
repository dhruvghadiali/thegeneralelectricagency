import { useEffect, useState, useRef } from "react";
import { Users, Clock, Building } from "lucide-react";

import ProjectsSectionComponent from "@ScreenComponents/projects/projectsSectionComponent";
import ProjectsSectionStatsComponent from "@ScreenComponents/projects/projectsSectionStatsComponent";
import ProjectsSectionHeadingComponent from "@ScreenComponents/projects/projectsSectionHeadingComponent";

import gaclLogo from "@Assets/images/gacl-logo.png";
import adaniLogo from "@Assets/images/adani-logo.png";

function ProjectsIntroComponent() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const projectStats = [
    { number: "150+", label: "Projects Completed", icon: Building },
    { number: "50+", label: "Happy Clients", icon: Users },
    { number: "100%", label: "On-Time Delivery", icon: Clock },
  ];

  const projectsData = [
    {
      title: "Dia Pile",
      location: "Dahej Bharuch Gujarat",
      client: "Gujarat Alkalies and Chemicals Limited",
      type: "Piling",
      status: "Completed",
      image: gaclLogo,
      description:
        "Major infrastructure project involving Pile foundation work for a chemical plant expansion.",
      services: ["Pile Foundation", "Pile Testing", "Earth Retention"],
      highlights: [
        "450mm to 600mm piles installed",
        "Zero safety incidents throughout project",
      ],
      color: "from-blue-500 to-blue-700",
    },
      {
      title: "Dia Pile",
      location: "Dahej Bharuch Gujarat",
      client: "Adani Cement Industries Limited",
      type: "Piling",
      status: "Completed",
      image: "",
      description:
        "Major infrastructure project involving Pile foundation work for a chemical plant expansion.",
      services: ["Pile Foundation", "Pile Testing", "Earth Retention"],
      highlights: [
        "450mm to 600mm piles installed",
        "Zero safety incidents throughout project",
      ],
      color: "from-green-500 to-green-700",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate stats first
            projectStats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
              }, index * 150);
            });

            // Then animate project cards
            setTimeout(() => {
              projectsData.forEach((_, index) => {
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
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <ProjectsSectionHeadingComponent hasAnimated={hasAnimated} />

        {/* Project Stats */}
        <ProjectsSectionStatsComponent
          projectStats={projectStats}
          visibleStats={visibleStats}
        />

        {/* Projects Grid */}
        <ProjectsSectionComponent
          projectsData={projectsData}
          visibleCards={visibleCards}
        />
      </div>
    </section>
  );
}

export default ProjectsIntroComponent;
