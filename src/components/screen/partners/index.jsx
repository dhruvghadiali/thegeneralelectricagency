import cgIcon from "@/assets/images/cg-icon.png";
import kegIcon from "@/assets/images/keg-icon.png";
import premiumIcon from "@/assets/images/premium-transmission-icon.png";
import { Award, BadgeCheck, Globe2, PackageCheck } from "lucide-react";
import { useState } from "react";
import { Typography } from "@shadcnComponent/typography";

const partners = [
  {
    name: "CG Power and Industrial Solutions",
    shortName: "CG Power",
    type: "Power & Industrial Solutions",
    logo: "CG",
    image: cgIcon,
    partnership: "Authorized Dealer",
    since: "1939",
    products: "Motors, Drives, Pumps",
    coverage: "Pan India",
    description:
      "Electrical equipment, power systems, and industrial solutions for demanding plant operations.",
    specialization: ["Industrial Motors", "Drives", "Pumps", "Switchgear"],
  },
  {
    name: "RPG Cables KEC International Ltd",
    shortName: "RPG KEC",
    type: "Cables & Infrastructure",
    logo: "RPG",
    image: kegIcon,
    partnership: "Channel Partner",
    since: "2015",
    products: "Power & Control Cables",
    coverage: "Western & Central India",
    description:
      "Infrastructure and cable solutions for power transmission, industrial wiring, and electrification projects.",
    specialization: ["Power Cables", "Control Cables", "Infrastructure", "EPC"],
  },
  {
    name: "Premium Transmission Limited",
    shortName: "Premium",
    type: "Transmission Solutions",
    logo: "PTL",
    image: premiumIcon,
    partnership: "Exclusive Distributor",
    since: "2018",
    products: "Gear Boxes, Gear Motors",
    coverage: "Gujarat & Rajasthan",
    description:
      "Transmission products and drive solutions for mechanical systems, automation, and industrial motion.",
    specialization: ["Gear Boxes", "Gear Motors", "Industrial Drives", "Automation"],
  },
];

function PartnersScreenComponent() {
  const [activePartnerIndex, setActivePartnerIndex] = useState(0);
  const activePartner = partners[activePartnerIndex];

  return (
    <div className="partners-carousel-showcase" id="partners">
      <section
        className="partners-carousel-showcase__shell"
        aria-label="Partner showcase"
      >
        <div className="partners-carousel-showcase__panel">
          <div className="partners-carousel-showcase__stage">
            {partners.map((partner, index) => {
              const distance = index - activePartnerIndex;
              const absDistance = Math.abs(distance);
              const isActive = index === activePartnerIndex;

              return (
                <article
                  className={`partners-carousel-showcase__card ${
                    isActive ? "partners-carousel-showcase__card--active" : ""
                  }`}
                  key={partner.name}
                  style={{
                    "--partner-card-distance": distance,
                    "--partner-card-abs-distance": absDistance,
                  }}
                  onClick={() => setActivePartnerIndex(index)}
                >
                  <div className="partners-carousel-showcase__logo">
                    <img src={partner.image} alt={`${partner.shortName} logo`} />
                    <Typography as="span" variant="label">{partner.logo}</Typography>
                  </div>
                  <div className="partners-carousel-showcase__card-copy">
                    <Typography as="span" variant="overline">{partner.type}</Typography>
                    <Typography as="h2" variant="sectionTitle">{partner.shortName}</Typography>
                    <Typography variant="bodySmall">{partner.description}</Typography>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="partners-carousel-showcase__details">
            <div>
              <Typography as="span" variant="overline">Strategic Partner</Typography>
              <Typography as="h3" variant="cardTitle">{activePartner.name}</Typography>
            </div>

            <div className="partners-carousel-showcase__meta">
              <Typography as="span" variant="label">
                <Award size={15} strokeWidth={2.4} />
                {activePartner.partnership}
              </Typography>
              <Typography as="span" variant="label">
                <Globe2 size={15} strokeWidth={2.4} />
                {activePartner.coverage}
              </Typography>
              <Typography as="span" variant="label">
                <PackageCheck size={15} strokeWidth={2.4} />
                {activePartner.products}
              </Typography>
              <Typography as="span" variant="label">
                <BadgeCheck size={15} strokeWidth={2.4} />
                Since {activePartner.since}
              </Typography>
            </div>

            <div className="partners-carousel-showcase__chips">
              {activePartner.specialization.map((item) => (
                <Typography as="span" variant="caption" key={item}>{item}</Typography>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PartnersScreenComponent;
