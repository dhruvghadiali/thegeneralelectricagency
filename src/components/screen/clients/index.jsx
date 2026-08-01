import larsenToubroLogo from "@/assets/images/l&t.png";
import relianceLogo from "@/assets/images/reliance.png";

/**
 * Logos are bundled assets, never fetched at runtime.
 *
 * These used to come from logo.clearbit.com, which was retired after the
 * HubSpot acquisition - the hostname no longer resolves, so every card fired a
 * failed request on each render. Entries without a bundled `logo` fall back to
 * their monogram, which needs no network at all.
 *
 * To add a real logo: drop the file in src/assets/images, import it above and
 * set it as `logo` on the matching entry.
 */
const clientCompanies = [
  { name: "Tata Group", category: "Conglomerate", mark: "TG" },
  {
    name: "Reliance",
    category: "Petrochemicals",
    mark: "R",
    logo: relianceLogo,
  },
  {
    name: "L&T",
    category: "Engineering",
    mark: "LT",
    logo: larsenToubroLogo,
  },
  { name: "Adani Group", category: "Infrastructure", mark: "AG" },
  { name: "Mahindra", category: "Automotive", mark: "M" },
  { name: "Godrej", category: "Consumer Goods", mark: "G" },
  { name: "NTPC", category: "Power", mark: "NTPC" },
  { name: "BHEL", category: "Heavy Engineering", mark: "BHEL" },
  { name: "ONGC", category: "Oil & Gas", mark: "ONGC" },
  { name: "Indian Railways", category: "Transportation", mark: "IR" },
];

const clientStats = [
  { value: "500+", label: "Clients" },
  { value: "1000+", label: "Projects" },
  { value: "50+", label: "Industries" },
];

function Clients() {
  const firstRail = clientCompanies.slice(0, 5);
  const secondRail = clientCompanies.slice(5);

  return (
    <div className="clients-logo-showcase" id="clients">
      <section
        className="clients-logo-showcase__shell"
        aria-label="Clients showcase"
      >
        <div className="clients-logo-showcase__panel">
          <div className="clients-logo-showcase__summary">
            <span>Trusted by Industry Leaders</span>
            <div className="clients-logo-showcase__stats">
              {clientStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <small>{stat.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="clients-logo-showcase__rails">
            {[firstRail, secondRail].map((rail, railIndex) => (
              <div className="clients-logo-showcase__rail" key={railIndex}>
                {[...rail, ...rail].map((client, index) => {
                  // The rail is duplicated to loop seamlessly; hide the second
                  // copy from assistive tech so names are not announced twice.
                  const isDuplicate = index >= rail.length;

                  return (
                    <article
                      className="clients-logo-showcase__logo-card"
                      key={`${client.name}-${index}`}
                      aria-hidden={isDuplicate ? "true" : undefined}
                    >
                      <div className="clients-logo-showcase__logo-mark">
                        {client.logo ? (
                          <img
                            src={client.logo}
                            alt={`${client.name} logo`}
                            loading="lazy"
                          />
                        ) : (
                          <span>{client.mark}</span>
                        )}
                      </div>
                      <div>
                        <h3>{client.name}</h3>
                        <p>{client.category}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
