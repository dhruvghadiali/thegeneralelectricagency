import { Button } from "@/components/ui/button";
import moment from "moment";

// Import company logos
import cgLogo from "@/assets/images/cg-icon.png";
import kegLogo from "@/assets/images/keg-icon.png";
import premiumTransmissionLogo from "@/assets/images/premium-transmission-icon.png";

function AboutScreenComponent() {
  const currentYear = moment().year();
  const yearsInBusiness = currentYear - 1939;
  return (
    <div className="min-h-screen bg-background">
      {/* About Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/15 dark:via-gray-900 dark:to-secondary/20">
        <div className="container mx-auto px-4 py-12 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 lg:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs lg:text-sm font-medium">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Our Story
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Legacy of <span className="text-primary">Excellence</span>
              </h1>

              <p className="text-base lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A journey spanning four generations of dedicated service to
                India's industrial sector, from a small store in Khambhat to
                becoming the second-largest dealer in rotating machines and
                drives in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Our Journey Through Time
              </h2>
              <p className="text-xl text-muted-foreground">
                From humble beginnings to industry leadership - the story of The
                General Electric Agency
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Desktop Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden lg:block"></div>
              {/* Mobile Timeline Line */}
              <div className="absolute left-6 top-0 h-full w-1 bg-border block lg:hidden"></div>

              <div className="space-y-8 lg:space-y-12">
                {/* 1939 */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-0 lg:w-[48%] lg:text-right lg:pr-4">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-primary mb-2">
                        1939
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        The Beginning
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        Establishment in 1939, Agency was originally named{" "}
                        <strong>The General Electric Store </strong>
                        in Khambhat, Gujarat by pioneer{" "}
                        <strong>Late Shri Mafatlal Ambalal Patel</strong>. What
                        started as a humble electrical store would grow to
                        become a cornerstone of Gujarat's industrial
                        development.
                      </p>
                    </div>
                  </div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-primary to-primary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>

                  <div className="hidden lg:block lg:w-[48%]"></div>
                </div>

                {/* 1989 */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-4 lg:w-[48%] lg:text-left lg:order-2">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-secondary mb-2">
                        1989
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        Evolution & Expansion
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        In 1989, the name evolved to{" "}
                        <strong>General Electric Agency</strong>, expanding its
                        operations to Ankleshwar, Gujarat by{" "}
                        <strong>Late Shri Navinchandra Mafatlal Patel</strong>.
                        The subsequent management of the agency was entrusted to
                        his sons, marking a new era of growth and expansion.
                      </p>
                    </div>
                  </div>

                  {/* Desktop: Left spacer */}
                  <div className="hidden lg:block lg:w-[48%] lg:order-1"></div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Third Generation */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-0 lg:w-[48%] lg:text-right lg:pr-4">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-primary mb-2">
                        Third Generation
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        Leadership & Growth
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        The agency management was entrusted to{" "}
                        <strong>Shri Piyush Navinchandra Patel</strong> and
                        <strong> Mr. Nimesh Navinchandra Patel</strong>, who
                        achieved significant success. Over the years, the
                        business currently stands as the{" "}
                        <strong>
                          second-largest dealership for rotating machines and
                          drives in India as of 2023
                        </strong>
                        .
                      </p>
                    </div>
                  </div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-primary to-primary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>

                  <div className="hidden lg:block lg:w-[48%]"></div>
                </div>

                {/* Fourth Generation */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-4 lg:w-[48%] lg:text-left lg:order-2">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-secondary mb-2">
                        Fourth Generation
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        Future Leadership
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        With continuous growth in business, we are proud to
                        announce that the fourth generation, represented by{" "}
                        <strong>Mr. Harikesh Piyush Patel</strong>, is now
                        actively involved in leading the pursuit, ensuring the
                        family legacy continues with modern innovation.
                      </p>
                    </div>
                  </div>

                  {/* Desktop: Left spacer */}
                  <div className="hidden lg:block lg:w-[48%] lg:order-1"></div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Partnerships & Growth */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-0 lg:w-[48%] lg:text-right lg:pr-4">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-primary mb-2">
                        Strategic Partnerships
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        Authorized Dealer Network
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        We are authorized dealer of various reputed products
                        like{" "}
                        <strong>
                          CG Power, Premium Gearbox, and RPG Cables
                        </strong>
                        . This collaboration has empowered us to expand our vast
                        product basket within the industrial machinery sector.
                      </p>
                    </div>
                  </div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-primary to-primary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>

                  <div className="hidden lg:block lg:w-[48%]"></div>
                </div>

                {/* Current Success */}
                <div className="relative flex items-center lg:justify-between lg:min-h-[150px]">
                  {/* Mobile Timeline Dot */}
                  <div className="absolute left-6 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-background block lg:hidden z-10"></div>

                  {/* Content - Mobile: Full width, Desktop: Split */}
                  <div className="w-full pl-16 lg:pl-4 lg:w-[48%] lg:text-left lg:order-2">
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 lg:transform lg:hover:-translate-y-1">
                      <h3 className="text-lg lg:text-xl font-bold text-secondary mb-2">
                        2024-2025
                      </h3>
                      <h4 className="text-base lg:text-lg font-semibold text-card-foreground mb-2 lg:mb-3">
                        Remarkable Achievement
                      </h4>
                      <p className="text-card-foreground leading-relaxed text-sm lg:text-sm">
                        <strong>The General Electric Agency</strong> which was
                        started from scratch has reached to
                        <strong>
                          INR 0.50 crores (INR 5 Million) turnover company
                        </strong>
                        , a testament to our commitment to excellence and
                        customer satisfaction over 85+ years.
                      </p>
                    </div>
                  </div>

                  {/* Desktop: Left spacer */}
                  <div className="hidden lg:block lg:w-[48%] lg:order-1"></div>

                  {/* Desktop Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-br from-secondary to-secondary/80 rounded-full border-3 border-background hidden lg:block z-10 shadow-lg">
                    <div className="absolute inset-1 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pt-12">
              <div className="text-center space-y-2">
                <div className="text-2xl lg:text-4xl font-bold text-primary">
                  {yearsInBusiness}
                </div>
                <div className="text-muted-foreground font-medium text-sm lg:text-base">
                  Years of Excellence
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl lg:text-4xl font-bold text-primary">
                  4
                </div>
                <div className="text-muted-foreground font-medium text-sm lg:text-base">
                  Generations
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl lg:text-4xl font-bold text-primary">
                  #2
                </div>
                <div className="text-muted-foreground font-medium text-sm lg:text-base">
                  Largest Dealer in India
                </div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl lg:text-4xl font-bold text-primary">
                  ₹5M
                </div>
                <div className="text-muted-foreground font-medium text-sm lg:text-base">
                  Annual Turnover
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authorized Partners Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold text-foreground">
                Our Trusted Partners
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground">
                Authorized dealer of industry-leading brands, expanding our vast
                product portfolio
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-xl flex items-center justify-center mx-auto p-2 border border-gray-200">
                  <img 
                    src={cgLogo} 
                    alt="CG Power Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-card-foreground">
                  CG Power
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  Premium electrical equipment and power solutions
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-xl flex items-center justify-center mx-auto p-2 border border-gray-200">
                  <img 
                    src={kegLogo} 
                    alt="KEG Premium Gearbox Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-card-foreground">
                  Premium Gearbox
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  High-quality gearbox solutions for industrial applications
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-xl flex items-center justify-center mx-auto p-2 border border-gray-200">
                  <img 
                    src={premiumTransmissionLogo} 
                    alt="Premium Transmission Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-card-foreground">
                  Premium Transmission
                </h3>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  Superior transmission solutions for industrial machinery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-8 lg:mb-12">
              <h2 className="text-2xl lg:text-4xl font-bold text-foreground">
                Our Core Values
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground">
                The principles that have guided us for over eight decades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl lg:text-2xl">
                    T
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-card-foreground">
                  Trust
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Building lasting relationships through transparency,
                  reliability, and honest business practices.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-secondary font-bold text-xl lg:text-2xl">
                    Q
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-card-foreground">
                  Quality
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Delivering premium products and services that exceed industry
                  standards and customer expectations.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 lg:p-6 text-center space-y-3 lg:space-y-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl lg:text-2xl">
                    I
                  </span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-card-foreground">
                  Innovation
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Embracing new technologies and solutions to stay ahead in the
                  evolving industrial landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutScreenComponent;
