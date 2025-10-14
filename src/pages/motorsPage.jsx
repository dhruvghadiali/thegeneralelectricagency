import NavigationMenuComponent from "@Components/navigationMenu";
import { ArrowLeft, CircuitBoard, Zap, Settings, Award, Download, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import motor1 from "@Assets/images/motor1.jpg";
import motor2 from "@Assets/images/motor2.jpg";
import motor3 from "@Assets/images/motor3.jpg";

function MotorsPage() {
  const navigate = useNavigate();

  const motorsData = [
    {
      id: "i2-motors",
      series: "I2 Series",
      title: "I2 Energy Efficient Motors",
      description: "Premium efficiency motors designed for continuous industrial applications with superior performance and energy savings.",
      efficiency: "IE2 Premium Efficiency",
      powerRange: "0.18 kW to 315 kW",
      voltageRange: "415V, 3 Phase, 50 Hz",
      image: motor2,
      features: [
        "IE2 Premium Efficiency Rating",
        "Cast Iron Frame Construction",
        "Low Noise & Vibration",
        "Extended Bearing Life",
        "Tropical Climate Protection",
        "Easy Maintenance Design"
      ],
      applications: [
        "Pumps & Compressors",
        "Conveyor Systems",
        "Machine Tools",
        "Textile Machinery",
        "Chemical Plants",
        "Food Processing"
      ],
      specifications: {
        frameSize: "80 to 355",
        protection: "IP55",
        insulation: "Class F",
        duty: "S1 (Continuous)",
        mounting: "B3, B5, B14, B35",
        cooling: "IC411 (TEFC)"
      }
    },
    {
      id: "i3-motors",
      series: "I3 Series",
      title: "I3 Super Premium Efficient Motors",
      description: "Ultra-high efficiency motors with advanced design for maximum energy savings and reduced carbon footprint.",
      efficiency: "IE3 Super Premium Efficiency",
      powerRange: "0.75 kW to 315 kW",
      voltageRange: "415V, 3 Phase, 50 Hz",
      image: motor1,
      features: [
        "IE3 Super Premium Efficiency",
        "Copper Rotor Technology",
        "Advanced Magnetic Design",
        "Reduced Energy Consumption",
        "Enhanced Thermal Management",
        "Smart Sensor Ready"
      ],
      applications: [
        "HVAC Systems",
        "Industrial Fans",
        "Centrifugal Pumps",
        "Automation Equipment",
        "Process Industries",
        "Data Centers"
      ],
      specifications: {
        frameSize: "90 to 355",
        protection: "IP55/IP56",
        insulation: "Class F",
        duty: "S1 (Continuous)",
        mounting: "B3, B5, B14, B35",
        cooling: "IC411 (TEFC)"
      }
    },
    {
      id: "i4-motors",
      series: "I4 Series",
      title: "I4 Synchronous Reluctance Motors",
      description: "Next-generation synchronous reluctance motors offering unmatched efficiency and performance for critical applications.",
      efficiency: "IE4 Super Premium Plus",
      powerRange: "1.1 kW to 200 kW",
      voltageRange: "415V, 3 Phase, 50 Hz",
      image: motor3,
      features: [
        "IE4 Super Premium Plus Efficiency",
        "Synchronous Reluctance Technology",
        "No Rotor Losses",
        "Exceptional Power Factor",
        "IoT Connectivity Ready",
        "Predictive Maintenance Support"
      ],
      applications: [
        "High-Precision Machinery",
        "Clean Room Applications",
        "Pharmaceutical Equipment",
        "Semiconductor Manufacturing",
        "Laboratory Equipment",
        "Premium HVAC Systems"
      ],
      specifications: {
        frameSize: "90 to 315",
        protection: "IP55/IP56",
        insulation: "Class F/H",
        duty: "S1 (Continuous)",
        mounting: "B3, B5, B14, B35",
        cooling: "IC411 (TEFC)"
      }
    }
  ];

  return (
    <>
      <NavigationMenuComponent useLink={true}/>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/15 dark:via-gray-900 dark:to-secondary/20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="flex items-center gap-2 hover:bg-primary/10 dark:hover:bg-primary/20 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Button>
            </div>

            {/* Page Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-sm font-medium mb-6 border border-primary/20 dark:border-primary/30">
                <CircuitBoard className="w-4 h-4 mr-2" />
                CG I2, I3 & I4 Series Motors
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white leading-tight mb-6">
                Industrial <span className="text-primary dark:text-primary">Motors</span>
              </h1>
              
              <p className="text-xl text-muted-foreground dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Discover CG Power's comprehensive range of energy-efficient industrial motors. 
                From IE2 to IE4 efficiency ratings, we provide solutions that deliver superior 
                performance while reducing energy consumption and operating costs.
              </p>
            </div>
          </div>
        </section>

        {/* Motors Grid */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {motorsData.map((motor, index) => (
                <div
                  key={motor.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Motor Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <img
                      src={motor.image}
                      alt={motor.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x400/3B82F6/FFFFFF?text=Motor+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 dark:to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary dark:text-primary text-sm font-semibold rounded-full border border-white/20 dark:border-gray-600/50">
                        {motor.series}
                      </span>
                    </div>
                  </div>

                  {/* Motor Content */}
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        {motor.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed">
                        {motor.description}
                      </p>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Power Range:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{motor.powerRange}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Voltage:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{motor.voltageRange}</span>
                      </div>
                    </div>

                    {/* Key Features Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground dark:text-gray-200 mb-3 uppercase tracking-wider">
                        Key Features
                      </h4>
                      <div className="space-y-2">
                        {motor.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary dark:bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground dark:text-gray-300 text-xs">{feature}</span>
                          </div>
                        ))}
                        {motor.features.length > 4 && (
                          <div className="text-xs text-primary dark:text-primary font-medium">
                            +{motor.features.length - 4} more features
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
                        {motor.applications.slice(0, 3).map((app, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gradient-to-r from-secondary/20 to-secondary/30 dark:from-secondary/40 dark:to-secondary/50 text-secondary dark:text-secondary-foreground text-xs font-medium rounded-full border border-secondary/30 dark:border-secondary/60 shadow-sm dark:shadow-md backdrop-blur-sm"
                          >
                            {app}
                          </span>
                        ))}
                        {motor.applications.length > 3 && (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-500 shadow-sm dark:shadow-md">
                            +{motor.applications.length - 3} more
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

export default MotorsPage;
