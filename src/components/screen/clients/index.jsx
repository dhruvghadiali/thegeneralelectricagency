const clientCompanies = [
  {
    name: "Tata Group",
    category: "Conglomerate",
    mark: "TG",
    logoUrl: "https://logo.clearbit.com/tata.com",
  },
  {
    name: "Reliance",
    category: "Petrochemicals",
    mark: "R",
    logoUrl: "https://logo.clearbit.com/ril.com",
  },
  {
    name: "L&T",
    category: "Engineering",
    mark: "LT",
    logoUrl: "https://logo.clearbit.com/larsentoubro.com",
  },
  {
    name: "Adani Group",
    category: "Infrastructure",
    mark: "AG",
    logoUrl: "https://logo.clearbit.com/adani.com",
  },
  {
    name: "Mahindra",
    category: "Automotive",
    mark: "M",
    logoUrl: "https://logo.clearbit.com/mahindra.com",
  },
  {
    name: "Godrej",
    category: "Consumer Goods",
    mark: "G",
    logoUrl: "https://logo.clearbit.com/godrej.com",
  },
  {
    name: "NTPC",
    category: "Power",
    mark: "NTPC",
    logoUrl: "https://logo.clearbit.com/ntpc.co.in",
  },
  {
    name: "BHEL",
    category: "Heavy Engineering",
    mark: "BHEL",
    logoUrl: "https://logo.clearbit.com/bhel.com",
  },
  {
    name: "ONGC",
    category: "Oil & Gas",
    mark: "ONGC",
    logoUrl: "https://logo.clearbit.com/ongcindia.com",
  },
  {
    name: "Indian Railways",
    category: "Transportation",
    mark: "IR",
    logoUrl: "https://logo.clearbit.com/indianrailways.gov.in",
  },
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
                {[...rail, ...rail].map((client, index) => (
                  <article
                    className="clients-logo-showcase__logo-card"
                    key={`${client.name}-${index}`}
                  >
                    <div className="clients-logo-showcase__logo-mark">
                      <img
                        src={client.logoUrl}
                        alt={`${client.name} logo`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                          event.currentTarget.nextElementSibling?.removeAttribute(
                            "hidden",
                          );
                        }}
                      />
                      <span hidden>{client.mark}</span>
                    </div>
                    <div>
                      <h3>{client.name}</h3>
                      <p>{client.category}</p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
