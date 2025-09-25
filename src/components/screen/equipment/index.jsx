import { useEffect, useState, useRef } from "react";
import { Users, Truck, Settings } from "lucide-react";

import EquipmentSectionComponent from "@ScreenComponents/equipment/equipmentSectionComponent";
import EquipmentSectionStatsComponent from "@ScreenComponents/equipment/equipmentSectionStatsComponent";
import EquipmentSectionHeadingComponent from "@ScreenComponents/equipment/equipmentSectionHeadingComponent";

const equipmentData = [
  {
    name: "Pile Boring",
    category: "Foundation Equipment",
    model: "HPD-2500X",
    image: "🏗️",
    description:
      "High-performance hydraulic pile driver for deep foundation installations with precision control and minimal vibration.",
    specifications: ["Pile Diameter: 300-1200mm", "Operating Depth: 45m"],
    applications: ["Bridge Foundations", "Building Piles", "Marine Structures"],
  },
  {
    name: "Load Testing Equipment",
    category: "Testing Systems",
    model: "LTE-5000",
    image: "⚖️",
    description:
      "Comprehensive load testing system for pile capacity verification with real-time data acquisition.",
    specifications: [
      "Max Test Load: 5,000 kN",
      "Accuracy: ±0.1%",
      "Data Points: 1000/sec",
      "Displacement Range: 200mm",
    ],
    applications: [
      "Static Load Testing",
      "Dynamic Testing",
      "Integrity Testing",
    ],
  },
  {
    name: "Crane with Pile Equipment",
    category: "Lifting Equipment",
    model: "CPE-200T",
    image: "🏗️",
    description:
      "Mobile crane specially configured for pile installation with precision positioning and heavy lifting capacity.",
    specifications: [
      "Lifting Capacity: 50 tons",
      "Boom Length: 29m",
      "Working Radius: 20m",
    ],
    applications: [
      "RMC Casting",
      "Heavy Equipment Placement",
      "Material Handling",
    ],
  },
];

const EquipmentIntroComponent = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const equipmentStats = [
    { number: "50+", label: "Heavy Equipment", icon: Truck },
    { number: "99%", label: "Uptime Record", icon: Settings },
    { number: "24/7", label: "Technical Support", icon: Users },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate stats first
            equipmentStats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
              }, index * 150);
            });

            // Then animate equipment cards
            setTimeout(() => {
              equipmentData.forEach((_, index) => {
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
      id="equipment"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <EquipmentSectionHeadingComponent hasAnimated={hasAnimated} />

        {/* Stats Section */}
        <EquipmentSectionStatsComponent
          equipmentStats={equipmentStats}
          visibleStats={visibleStats}
        />

        {/* Equipment Grid */}
        <EquipmentSectionComponent
          equipmentData={equipmentData}
          visibleCards={visibleCards}
        />
      </div>
    </section>
  );
};

export default EquipmentIntroComponent;
