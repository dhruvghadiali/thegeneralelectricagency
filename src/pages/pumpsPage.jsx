import NavigationMenuComponent from "@Components/navigationMenu";
import { ArrowLeft, Droplets, Zap, Settings, Award, Download, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import pump1 from "@Assets/images/cg-aow-pump.jpg";
import pump2 from "@Assets/images/cg-xmb-pump.jpg";
import pump3 from "@Assets/images/cg-dmb-pump.jpg";
import pump4 from "@Assets/images/cg-down-pump.jpg";
import pump5 from "@Assets/images/cg-stp-pump.jpg";
import pump6 from "@Assets/images/cg-mini-pump.jpg";

function PumpsPage() {
  const navigate = useNavigate();

  const pumpsData = [
    {
      id: "cgxmb-25",
      series: "CGXMB-25",
      title: "CG XMB-25 Centrifugal Pump",
      description: "High-performance centrifugal pump designed for water supply, irrigation, and general purpose applications with exceptional reliability and efficiency.",
      efficiency: "Up to 85% Efficiency",
      powerRange: "1 HP to 5 HP",
      flowRate: "40 to 180 LPM",
      headRange: "15 to 55 Meters",
      image: pump1,
      features: [
        "Cast Iron Pump Body",
        "Bronze Impeller",
        "Mechanical Seal",
        "Self-Priming Design",
        "Corrosion Resistant",
        "Low Maintenance",
        "Energy Efficient Operation",
        "Compact Design"
      ],
      applications: [
        "Domestic Water Supply",
        "Agricultural Irrigation",
        "Garden Sprinkler Systems",
        "Swimming Pool Circulation",
        "Pressure Boosting",
        "General Water Transfer"
      ],
      specifications: {
        suctionSize: "25mm (1 inch)",
        deliverySize: "25mm (1 inch)",
        maxTemperature: "60°C",
        maxPressure: "6 Bar",
        motorType: "Single Phase / Three Phase",
        construction: "Close Coupled"
      }
    },
    {
      id: "cgaow-20",
      series: "CGAOW-20",
      title: "CG AOW-20 Open Well Submersible Pump",
      description: "Heavy-duty open well submersible pump designed for deep water extraction from bore wells, open wells, and sumps with superior performance.",
      efficiency: "Up to 82% Efficiency",
      powerRange: "0.5 HP to 2 HP",
      flowRate: "25 to 120 LPM",
      headRange: "20 to 80 Meters",
      image: pump2,
      features: [
        "Stainless Steel Body",
        "High-Grade Stainless Steel Impellers",
        "Water-Filled Motor Design",
        "Corrosion Resistant Construction",
        "Continuous Operation Capability",
        "Low Maintenance Design",
        "Energy Efficient Motor",
        "Compact & Lightweight"
      ],
      applications: [
        "Bore Well Water Extraction",
        "Open Well Pumping",
        "Sump Water Transfer",
        "Domestic Water Supply",
        "Agricultural Applications",
        "Small Scale Irrigation"
      ],
      specifications: {
        diameter: "100mm (4 inch)",
        motorType: "Single Phase",
        insulation: "Class F",
        motorFilling: "Water Filled",
        cableEntry: "Direct Cable Entry",
        construction: "Submersible"
      }
    },
    {
      id: "cgdmb-05",
      series: "CGDMB-0.5",
      title: "CG DMB-0.5 HP Domestic Monoblock Pump",
      description: "Compact domestic monoblock pump designed for household water supply, small gardens, and residential applications with reliable performance.",
      efficiency: "Up to 70% Efficiency",
      powerRange: "0.5 HP",
      flowRate: "25 to 60 LPM",
      headRange: "15 to 35 Meters",
      image: pump3,
      features: [
        "Compact Monoblock Design",
        "Cast Iron Pump Body",
        "Stainless Steel Shaft",
        "Mechanical Seal",
        "Self-Priming",
        "Single Phase Motor",
        "Easy Installation",
        "Low Power Consumption"
      ],
      applications: [
        "Home Water Supply",
        "Small Garden Irrigation",
        "Bathroom Water Pressure",
        "Kitchen Water Boost",
        "Small Apartments",
        "Roof Tank Filling"
      ],
      specifications: {
        suctionSize: "25mm (1 inch)",
        deliverySize: "25mm (1 inch)",
        maxTemperature: "60°C",
        maxPressure: "4 Bar",
        motorType: "Single Phase",
        construction: "Monoblock"
      }
    },
    {
      id: "cgdown-3",
      series: "CG DOWN-3",
      title: "CG Down-3 Submersible Borewell Pump",
      description: "High-efficiency submersible borewell pump designed for deep water extraction from narrow bore wells with superior performance and reliability.",
      efficiency: "Up to 88% Efficiency",
      powerRange: "1 HP to 3 HP",
      flowRate: "30 to 120 LPM",
      headRange: "50 to 200 Meters",
      image: pump4,
      features: [
        "Stainless Steel Construction",
        "Multi-Stage Design",
        "High Head Performance",
        "Sand Resistant Technology",
        "Thermal Overload Protection",
        "Water Lubricated Bearings",
        "Corrosion Resistant",
        "Maintenance Free Operation"
      ],
      applications: [
        "Deep Bore Wells",
        "Tube Wells",
        "Agricultural Irrigation",
        "Drinking Water Supply",
        "Industrial Water Extraction",
        "Municipal Water Systems"
      ],
      specifications: {
        diameter: "75mm (3 inch)",
        motorType: "Single Phase / Three Phase",
        insulation: "Class F",
        motorFilling: "Water Filled",
        cableEntry: "Direct Cable Entry",
        construction: "Submersible Borewell"
      }
    },
    {
      id: "cgstp-50",
      series: "CG STP-50",
      title: "CG STP-50 Sewage Treatment Pump",
      description: "Heavy-duty sewage treatment pump designed for municipal and industrial wastewater handling with superior solids handling capability and reliability.",
      efficiency: "Up to 85% Efficiency",
      powerRange: "5 HP to 15 HP",
      flowRate: "200 to 800 LPM",
      headRange: "10 to 40 Meters",
      image: pump5,
      features: [
        "Cast Iron Volute Casing",
        "Semi-Open Impeller Design",
        "Large Solids Handling",
        "Corrosion Resistant Coating",
        "Heavy Duty Construction",
        "Clog-Free Operation",
        "Easy Maintenance Access",
        "Robust Motor Protection"
      ],
      applications: [
        "Municipal Sewage Treatment",
        "Industrial Wastewater",
        "Effluent Transfer",
        "Sewage Pumping Stations",
        "Wastewater Treatment Plants",
        "Commercial Buildings"
      ],
      specifications: {
        suctionSize: "125mm (5 inch)",
        deliverySize: "100mm (4 inch)",
        maxTemperature: "80°C",
        solidsHandling: "Up to 50mm",
        motorType: "Three Phase",
        construction: "End Suction"
      }
    },
    {
      id: "cgmini-05",
      series: "CG MINI-0.5",
      title: "CG Mini-0.5 HP Compact Pump",
      description: "Ultra-compact mini pump designed for small-scale applications, domestic use, and space-constrained installations with reliable performance and energy efficiency.",
      efficiency: "Up to 65% Efficiency",
      powerRange: "0.5 HP",
      flowRate: "15 to 40 LPM",
      headRange: "8 to 25 Meters",
      image: pump6,
      features: [
        "Ultra-Compact Design",
        "Lightweight Construction",
        "Self-Priming Capability",
        "Low Noise Operation",
        "Corrosion Resistant Body",
        "Easy Installation",
        "Energy Efficient Motor",
        "Minimal Maintenance"
      ],
      applications: [
        "Small Home Water Supply",
        "Aquarium Circulation",
        "Garden Sprinkler Systems",
        "Pressure Boosting",
        "Tank Transfer",
        "Fountain Applications"
      ],
      specifications: {
        suctionSize: "20mm (3/4 inch)",
        deliverySize: "20mm (3/4 inch)",
        maxTemperature: "50°C",
        maxPressure: "2.5 Bar",
        motorType: "Single Phase",
        construction: "Compact Monoblock"
      }
    },
  ];

  return (
    <>
      <NavigationMenuComponent useLink={true}/>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/15 dark:via-gray-900 dark:to-secondary/20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            

            {/* Page Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white leading-tight mb-6">
                Complete <span className="text-primary dark:text-primary">Pump</span> Solutions
              </h1>
              
              <p className="text-xl text-muted-foreground dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Explore CG's comprehensive pump range including CGXMB centrifugal pumps for 
                surface applications, CGAOW submersible open well pumps, CGDMB domestic monoblock 
                pumps for residential use, CG DOWN submersible borewell pumps for deep water extraction,
                CG STP sewage treatment pumps for municipal and industrial wastewater applications,
                and CG MINI compact pumps for small-scale and domestic applications.
              </p>
            </div>
          </div>
        </section>

        {/* Pumps Grid */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {pumpsData.map((pump, index) => (
                <div
                  key={pump.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Pump Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <img
                      src={pump.image}
                      alt={pump.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x400/06B6D4/FFFFFF?text=Pump+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 dark:to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary dark:text-primary text-sm font-semibold rounded-full border border-white/20 dark:border-gray-600/50">
                        {pump.series}
                      </span>
                    </div>
                  </div>

                  {/* Pump Content */}
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        {pump.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed">
                        {pump.description}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Power Range:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{pump.powerRange}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Flow Rate:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{pump.flowRate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Head Range:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{pump.headRange}</span>
                      </div>
                    </div>

                    {/* Key Features Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground dark:text-gray-200 mb-3 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {pump.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary dark:bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground dark:text-gray-300 text-xs">{feature}</span>
                          </div>
                        ))}
                        {pump.features.length > 4 && (
                          <div className="text-xs text-primary dark:text-primary font-medium">
                            +{pump.features.length - 4} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Applications Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3 uppercase tracking-wider">
                        Applications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {pump.applications.slice(0, 3).map((app, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gradient-to-r from-secondary/20 to-secondary/30 dark:from-secondary/40 dark:to-secondary/50 text-secondary dark:text-secondary-foreground text-xs font-medium rounded-full border border-secondary/30 dark:border-secondary/60 shadow-sm dark:shadow-md backdrop-blur-sm"
                          >
                            {app}
                          </span>
                        ))}
                        {pump.applications.length > 3 && (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-500 shadow-sm dark:shadow-md">
                            +{pump.applications.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
                          <Download className="w-3 h-3 mr-1" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white">
                          <Download className="w-3 h-3 mr-1" />
                          Download Drawing
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PumpsPage;
