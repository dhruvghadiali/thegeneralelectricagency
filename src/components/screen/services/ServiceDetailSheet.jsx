import { CheckCircle2, Layers3, X } from "lucide-react";
import { createPortal } from "react-dom";

import useScrollLock from "@/utils/useScrollLock";
import { Typography } from "@/components/ui/typography";

function ServiceDetailSheet({
  selectedService,
  productDetails,
  serviceImage,
  onClose,
}) {
  // Hooks must run before the early return below, so the lock is conditional
  // on there actually being a service to show.
  useScrollLock(Boolean(selectedService));

  if (!selectedService) {
    return null;
  }

  return createPortal(
    <div
      className="service-detail-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-sheet-title"
    >
      <button
        type="button"
        className="service-detail-sheet__overlay"
        aria-label="Close service details"
        onClick={onClose}
      />

      <section className="service-detail-sheet__content" data-lenis-prevent>
        <div className="service-detail-sheet__handle" aria-hidden="true" />

        <button
          type="button"
          className="service-detail-sheet__close"
          aria-label="Close service details"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        <div className="service-detail-sheet__hero">
          <div className="service-detail-sheet__image">
            <img src={serviceImage} alt="" aria-hidden="true" />
          </div>

          <div className="service-detail-sheet__summary">
            <Typography as="span" variant="overline">
              <Layers3 size={15} strokeWidth={2.4} />
              Service details
            </Typography>
            <Typography as="h2" variant="sheetTitle" id="service-detail-sheet-title">{selectedService.title}</Typography>
            <Typography variant="body">{selectedService.description}</Typography>
          </div>
        </div>

        <div className="service-detail-sheet__grid">
          <div className="service-detail-sheet__panel">
            <Typography as="h3" variant="cardTitle">Key features</Typography>
            <div className="service-detail-sheet__list">
              {selectedService.features.map((feature) => (
                <Typography as="span" variant="bodySmall" key={feature}>
                  <CheckCircle2 size={15} strokeWidth={2.45} />
                  {feature}
                </Typography>
              ))}
            </div>
          </div>

          <div className="service-detail-sheet__panel">
            <Typography as="h3" variant="cardTitle">Applications</Typography>
            <div className="service-detail-sheet__chips">
              {selectedService.applications.map((application) => (
                <Typography as="span" variant="caption" key={application}>{application}</Typography>
              ))}
            </div>
          </div>
        </div>

        {productDetails && (
          <div className="service-detail-sheet__motor-series">
            <Typography as="h3" variant="cardTitle">{productDetails.title}</Typography>
            <div className="service-detail-sheet__motor-grid">
              {productDetails.products.map((product) => (
                <article
                  className="service-detail-sheet__motor-card"
                  key={product.id}
                >
                  <div className="service-detail-sheet__motor-image">
                    <img src={product.image} alt="" aria-hidden="true" />
                  </div>

                  <div className="service-detail-sheet__motor-content">
                    <Typography as="span" variant="overline">{product.series}</Typography>
                    <Typography as="h4" variant="cardTitle">{product.title}</Typography>
                    <Typography as="strong" variant="label">{product.highlight}</Typography>

                    <div className="service-detail-sheet__motor-meta">
                      {product.meta.map((item) => (
                        <Typography variant="bodySmall" key={item}>{item}</Typography>
                      ))}
                    </div>

                    <div className="service-detail-sheet__motor-specs">
                      {product.specs.map((spec) => (
                        <Typography as="small" variant="caption" key={spec}>{spec}</Typography>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}

export default ServiceDetailSheet;
