import { Building2 } from "lucide-react";

import moment from "moment";

const PartnersIntroductionComponent = () => {
  const currentYear = moment().year();
  const yearsInBusiness = currentYear - 1939;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Building2 className="w-4 h-4 mr-2" />
            Strategic Partnerships
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Our <span className="text-primary">Agency Partners</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
            Partnering with industry leaders to deliver world-class electrical
            solutions. Our strategic alliances ensure you get the best products
            with unmatched support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">
                Premium Partners
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">
                {yearsInBusiness}
              </div>
              <div className="text-sm text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">Pan</div>
              <div className="text-sm text-muted-foreground">
                India Coverage
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersIntroductionComponent;
