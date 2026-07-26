import { CheckCircle2, Layers3, X } from "lucide-react";

function ServiceDetailSheet({
  selectedService,
  productDetails,
  serviceImage,
  onClose,
}) {
  if (!selectedService) {
    return null;
  }

  return (
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

      <section className="service-detail-sheet__content">
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
            <span>
              <Layers3 size={15} strokeWidth={2.4} />
              Service details
            </span>
            <h2 id="service-detail-sheet-title">{selectedService.title}</h2>
            <p>{selectedService.description}</p>
          </div>
        </div>

        <div className="service-detail-sheet__grid">
          <div className="service-detail-sheet__panel">
            <h3>Key features</h3>
            <div className="service-detail-sheet__list">
              {selectedService.features.map((feature) => (
                <span key={feature}>
                  <CheckCircle2 size={15} strokeWidth={2.45} />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="service-detail-sheet__panel">
            <h3>Applications</h3>
            <div className="service-detail-sheet__chips">
              {selectedService.applications.map((application) => (
                <span key={application}>{application}</span>
              ))}
            </div>
          </div>
        </div>

        {productDetails && (
          <div className="service-detail-sheet__motor-series">
            <h3>{productDetails.title}</h3>
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
                    <span>{product.series}</span>
                    <h4>{product.title}</h4>
                    <strong>{product.highlight}</strong>

                    <div className="service-detail-sheet__motor-meta">
                      {product.meta.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>

                    <div className="service-detail-sheet__motor-specs">
                      {product.specs.map((spec) => (
                        <small key={spec}>{spec}</small>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default ServiceDetailSheet;
