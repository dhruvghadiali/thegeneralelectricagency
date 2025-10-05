const ClientsLogoComponent = () => {
  const clientLogos = [
    { name: "Tata Group", category: "Conglomerate" },
    { name: "Reliance", category: "Petrochemicals" },
    { name: "L&T", category: "Engineering" },
    { name: "Adani Group", category: "Infrastructure" },
    { name: "Bajaj Group", category: "Manufacturing" },
    { name: "Mahindra", category: "Automotive" },
    { name: "Godrej", category: "Consumer Goods" },
    { name: "Jindal Steel", category: "Steel" },
    { name: "NTPC", category: "Power" },
    { name: "BHEL", category: "Heavy Engineering" },
    { name: "Indian Railways", category: "Transportation" },
    { name: "ONGC", category: "Oil & Gas" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {clientLogos.map((client, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center h-28 group hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300">
                {client.name}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {client.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsLogoComponent;
