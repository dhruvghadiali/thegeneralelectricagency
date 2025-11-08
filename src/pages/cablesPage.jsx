import NavigationMenuComponent from "@Components/navigationMenu";
import { ArrowLeft, Cable, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import cableImg from "@Assets/images/cables.jpg";

function CablesPage() {
  const navigate = useNavigate();

  const cablesData = [
    {
      id: "xlpe-power",
      series: "XLPE Power",
      title: "XLPE Insulated Power Cables",
      description:
        "High-quality cross-linked polyethylene insulated low and medium voltage power cables for robust electrical distribution.",
      voltageClass: "1.1kV / 3.3kV / 6.6kV / 11kV / 33kV",
      conductorRange: "1.5 sq.mm to 630 sq.mm",
      image: cableImg,
      features: [
        "Cross-Linked Polyethylene Insulation",
        "High Thermal Short Circuit Rating",
        "Excellent Dielectric Strength",
        "Moisture & Chemical Resistance",
        "Armoured/Unarmoured Variants",
        "Low Capacitance",
        "UV Resistant Outer Sheath",
        "Long Service Life"
      ],
      applications: [
        "Utility Distribution",
        "Industrial Panels",
        "Renewable Integration",
        "Underground Networks",
        "Feeder Lines",
        "Process Plants"
      ],
      specifications: {
        standard: "IS 7098 / IEC 60502",
        conductor: "Al / Cu",
        insulation: "XLPE",
        sheath: "PVC / HDPE / FRLS",
        armour: "Steel Tape / Wire (optional)"
      }
    },
  ];

  return (
    <>
      <NavigationMenuComponent useLink={true} />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/15 dark:via-gray-900 dark:to-secondary/20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            
            {/* Page Header */}
            <div className="text-center max-w-4xl mx-auto mb-16">
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground dark:text-white leading-tight mb-6">
                High Reliability <span className="text-primary dark:text-primary">Cables</span>
              </h1>
              <p className="text-xl text-muted-foreground dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Premium low, medium voltage, control, instrumentation and specialty cables engineered for dependable transmission, safety, and longevity across demanding environments.
              </p>
            </div>
          </div>
        </section>
        {/* Cables Grid */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-center">
              <div/>
              {cablesData.map((cable) => (
                <div
                  key={cable.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 w-full max-w-[420px]"
                >
                  {/* Cable Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <img
                      src={cable.image}
                      alt={cable.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/500x400/64748B/FFFFFF?text=Cable+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/40 dark:to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary dark:text-primary text-sm font-semibold rounded-full border border-white/20 dark:border-gray-600/50">
                        {cable.series}
                      </span>
                    </div>
                  </div>
                  {/* Cable Content */}
                  <div className="p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        {cable.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-300 text-sm leading-relaxed">
                        {cable.description}
                      </p>
                    </div>
                    {/* Quick Specs */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Voltage Class:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{cable.voltageClass}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/15 dark:to-secondary/15 rounded-lg border border-primary/10 dark:border-primary/20">
                        <span className="text-sm font-medium text-muted-foreground dark:text-gray-300">Conductor Range:</span>
                        <span className="text-sm font-bold text-primary dark:text-primary">{cable.conductorRange}</span>
                      </div>
                    </div>
                    {/* Features Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground dark:text-gray-200 mb-3 uppercase tracking-wider">Key Features</h4>
                      <div className="space-y-2">
                        {cable.features.slice(0, 4).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary dark:bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground dark:text-gray-300 text-xs">{feature}</span>
                          </div>
                        ))}
                        {cable.features.length > 4 && (
                          <div className="text-xs text-primary dark:text-primary font-medium">+{cable.features.length - 4} more features</div>
                        )}
                      </div>
                    </div>
                    {/* Applications Preview */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground dark:text-white mb-3 uppercase tracking-wider">Applications</h4>
                      <div className="flex flex-wrap gap-2">
                        {cable.applications.slice(0, 3).map((app, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-gradient-to-r from-secondary/20 to-secondary/30 dark:from-secondary/40 dark:to-secondary/50 text-secondary dark:text-secondary-foreground text-xs font-medium rounded-full border border-secondary/30 dark:border-secondary/60 shadow-sm dark:shadow-md backdrop-blur-sm"
                          >
                            {app}
                          </span>
                        ))}
                        {cable.applications.length > 3 && (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium rounded-full border border-gray-300 dark:border-gray-500 shadow-sm dark:shadow-md">
                            +{cable.applications.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download Catalog
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Spec Sheet
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

export default CablesPage;
