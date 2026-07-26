import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
          <h3>{service.title}</h3>
        </div>
        <p>{service.description}</p>

        <div className="services-stack-showcase__tags">
          {service.applications.slice(0, 3).map((application) => (
            <span key={application}>{application}</span>
          ))}
        </div>

        <Button type="button" variant="outline" onClick={onViewDetails}>
          View Details
          <ArrowRight size={16} strokeWidth={2.4} />
        </Button>
      </div>
    </article>
  );
}

export default ServiceShowcaseCard;
