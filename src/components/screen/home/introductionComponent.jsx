import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import moment from "moment";

const HomeIntroductionComponent = () => {
  const currentYear = moment().year();
  const yearsInBusiness = currentYear - 1939;
  
  const navigate = useNavigate();

  const handleOurStoryClick = () => {
    navigate("/about");
  };

  const handleExploreServicesClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
          {`Est. 1939 • ${yearsInBusiness} Years of Excellence`}
        </div>

        <div className="mb-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary mb-2">
            The General Electric Agency
          </h2>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
          India's <span className="text-primary">Largest Dealer</span> in
          Rotating Machine & Drives
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          From humble beginnings in Khambhat to becoming a trusted name across
          Gujarat, we've been powering industries for over eight decades.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          size="lg"
          className="px-8 py-6 text-lg cursor-pointer"
          onClick={handleExploreServicesClick}
        >
          Explore Services
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-6 text-lg cursor-pointer"
          onClick={handleOurStoryClick}
        >
          Our Story
        </Button>
      </div>
    </div>
  );
};

export default HomeIntroductionComponent;
