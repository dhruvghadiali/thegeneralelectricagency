import { services } from "@/utils/services";
import { useEffect, useState } from "react";

import ServiceDetailSheet from "./ServiceDetailSheet";
import ServiceShowcaseCard from "./ServiceShowcaseCard";
import {
  serviceImages,
  serviceProductDetails,
} from "./servicesShowcase.constants";
import { useIsMobileServicesView } from "./useIsMobileServicesView";

function getCircularDistance(index, activeIndex, itemCount) {
  const rawDistance = index - activeIndex;

  if (rawDistance > itemCount / 2) {
    return rawDistance - itemCount;
  }

  if (rawDistance < -itemCount / 2) {
    return rawDistance + itemCount;
  }

  return rawDistance;
}

function Services() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const isMobileServicesView = useIsMobileServicesView();
  const activeService = services[activeServiceIndex];
  const selectedProductDetails = selectedService
    ? serviceProductDetails[selectedService.id]
    : null;
  const visibleServices = isMobileServicesView ? [activeService] : services;

  useEffect(() => {
    if (!selectedService) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedService(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedService]);

  return (
    <div className="services-stack-showcase" id="services">
      <section
        className="services-stack-showcase__shell"
        aria-label="Services showcase"
      >
        <div
          className={`services-stack-showcase__cards ${
            isMobileServicesView
              ? "services-stack-showcase__cards--mobile-single"
              : ""
          }`}
        >
          {visibleServices.map((service) => {
            const index = services.findIndex(({ id }) => id === service.id);
            const distance = getCircularDistance(
              index,
              activeServiceIndex,
              services.length,
            );
            const isActive = index === activeServiceIndex;
            const isVisible = Math.abs(distance) <= 2;

            return (
              <ServiceShowcaseCard
                key={service.id}
                service={service}
                image={serviceImages[service.id]}
                index={index}
                distance={distance}
                isActive={isActive}
                isVisible={isVisible}
                isBackLayer={!isActive && Math.abs(distance) === 1}
                serviceCount={services.length}
                onViewDetails={() => setSelectedService(service)}
              />
            );
          })}
        </div>

        <div className="services-stack-showcase__service-tabs">
          {services.map((service, index) => (
            <button
              type="button"
              key={service.id}
              className={
                activeService.id === service.id
                  ? "services-stack-showcase__service-tab services-stack-showcase__service-tab--active"
                  : "services-stack-showcase__service-tab"
              }
              onClick={() => setActiveServiceIndex(index)}
            >
              {service.title}
            </button>
          ))}
        </div>
      </section>

      <ServiceDetailSheet
        selectedService={selectedService}
        productDetails={selectedProductDetails}
        serviceImage={selectedService ? serviceImages[selectedService.id] : null}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}

export default Services;
