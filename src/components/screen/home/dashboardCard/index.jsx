import HomeDashboardCardTimelineDots from "@ScreenComponents/home/dashboardCard/timelineDots";
import HomeDashboardCardAnimationEffect from "@ScreenComponents/home/dashboardCard/animationEffect";
import HomeDashboardCardProgressIndicator from "@ScreenComponents/home/dashboardCard/progressIndicator";
import { Button } from "@ShadcnComponents/button";
import { Link } from "react-router-dom";

const HomeDashboardCard = () => {
  return (
    <div className="relative">
      <div className="relative z-10 bg-gradient-to-br from-primary/10 via-card to-secondary/10 dark:from-primary/15 dark:via-gray-800 dark:to-secondary/15 border border-primary/20 dark:border-primary/30 rounded-2xl p-8 shadow-xl overflow-hidden">
        {/* Floating Elements */}
        <HomeDashboardCardAnimationEffect />

        <div className="relative z-10 space-y-8">
          {/* Circular Progress Design */}
          <HomeDashboardCardProgressIndicator />

          {/* Timeline Dots */}
          <HomeDashboardCardTimelineDots />

          {/* Interactive Elements */}
          <div className="space-y-4">
            {/* Animated Wave Pattern */}
            <div className="relative h-14 bg-gradient-to-r from-primary/5 via-secondary/10 to-primary/5 dark:from-primary/10 dark:via-secondary/15 dark:to-primary/10 rounded-lg overflow-hidden border border-primary/10 dark:border-primary/20">
              <div className="absolute top-2  right-4">
                <div className="text-xs text-primary font-medium">
                  PAN Number
                </div>
                <div className="text-xs text-muted-foreground">AABFT1083B</div>
              </div>
              <div className="absolute top-2 left-4">
                <div className="text-xs text-primary font-medium">
                  GST Number
                </div>
                <div className="text-xs text-muted-foreground">
                  24AABFT1083B1ZR
                </div>
              </div>
            </div>

            {/* Enhanced Product Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-medium text-foreground mb-1">
                    CG LT Motors
                  </span>
                  <div className="text-xs mt-1 text-muted-foreground">
                    <div>I2 / I3 / I4</div>
                    <div className="text-primary font-medium mt-1">
                      200+ Units/Month
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-medium text-foreground mb-1">
                    Gear Boxes
                  </span>
                  <div className="text-xs mt-1 text-muted-foreground">
                    <div>Premium & Bonfiglioli </div>
                    <div className="text-primary font-medium mt-1">
                      50+ Units/Month
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-medium text-foreground mb-1">
                    Pumps
                  </span>
                  <div className="text-xs mt-1 text-muted-foreground">
                    <div>Crompton & CG Power</div>
                    <div className="text-primary font-medium mt-1">
                      75+ Units/Month
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign In CTA */}
            <div className="mt-2 flex items-center justify-between">
              <Link to="/sign-in" className="text-xs text-primary underline-offset-4 hover:underline">
                Sign in to manage orders
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full px-4 backdrop-blur bg-background/60 hover:bg-background/80 ring-1 ring-border/60"
                asChild
              >
                <Link to="/sign-in" aria-label="Go to Sign In">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="size-4 text-primary">
                    <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Sign In</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboardCard;
