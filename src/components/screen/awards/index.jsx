import { useEffect, useState, useRef } from "react";
import {
  Award,
  Trophy,
  Medal,
  Star,
  Calendar,
  Users,
  Target,
  Zap,
} from "lucide-react";

import AwardsSectionContainer from "@ScreenComponents/awards/awardsSectionContainer";
import AchievementSectionContainer from "@ScreenComponents/awards/achievementSectionContainer";
import AwardsSectionHeadingContainer from "@ScreenComponents/awards/awardsSectionHeadingContainer";

const AwardsIntroComponent = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleStats, setVisibleStats] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const achievementStats = [
    { number: "5+", label: "Industry Awards", icon: Trophy },
    { number: "2", label: "Safety Certifications", icon: Medal },
    { number: "1000+", label: "Days Zero Incidents", icon: Star },
    { number: "98%", label: "Client Satisfaction", icon: Award },
  ];

  const awardsData = [
    {
      title: "Site Safety Performance Award",
      organization: "Deepak Fertiliser & Petrochemicals Corporation Limited",
      year: "2025",
      category: "Site Safety",
      icon: Medal,
      description:
        "Achieved zero workplace incidents for 36 consecutive months while completing high-risk foundation projects.",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-800 dark:text-green-300",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            // Animate stats first
            achievementStats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
              }, index * 150);
            });

            // Then animate award cards
            setTimeout(() => {
              awardsData.forEach((_, index) => {
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
      id="awards"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Header Section */}
        <AwardsSectionHeadingContainer hasAnimated={hasAnimated} />

        {/* Achievement Stats */}
        <AchievementSectionContainer
          achievementStats={achievementStats}
          visibleStats={visibleStats}
        />

        {/* Awards Grid */}
        <AwardsSectionContainer
          awardsData={awardsData}
          visibleCards={visibleCards}
        />
      </div>
    </section>
  );
};

export default AwardsIntroComponent;
