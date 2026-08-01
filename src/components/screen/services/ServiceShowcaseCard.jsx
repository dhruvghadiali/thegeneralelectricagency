import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Typography } from "@/components/ui/typography";

function ServiceShowcaseCard({
  service,
  image,
  index,
  distance,
  isActive,
  isVisible,
  isBackLayer,
  serviceCount,
  onViewDetails,
}) {
  return (
    <article
      className={`services-stack-showcase__card ${
        isActive ? "services-stack-showcase__card--active" : ""
      } ${isVisible ? "services-stack-showcase__card--visible" : ""} ${
        isBackLayer ? "services-stack-showcase__card--back-layer" : ""
      }`}
      data-service-id={service.id}
      style={{
        "--service-card-index": index,
        "--service-card-distance": distance,
        "--service-card-abs-distance": Math.abs(distance),
        "--service-card-count": serviceCount,
      }}
    >
      <div className="services-stack-showcase__media">
        <img src={image} alt="" aria-hidden="true" />
      </div>

      <div className="services-stack-showcase__content">
        <div>
          <Typography as="h3" variant="cardTitle">{service.title}</Typography>
        </div>
        <Typography variant="bodySmall">{service.description}</Typography>

        <div className="services-stack-showcase__tags">
          {service.applications.slice(0, 3).map((application) => (
            <Typography as="span" variant="caption" key={application}>{application}</Typography>
          ))}
        </div>

        <Button type="button" variant="outline" onClick={onViewDetails}>
          <Typography as="span" variant="label">View Details</Typography>
          <ArrowRight size={16} strokeWidth={2.4} />
        </Button>
      </div>
    </article>
  );
}

export default ServiceShowcaseCard;
