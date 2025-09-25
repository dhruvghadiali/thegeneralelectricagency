
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HomeScreenComponent() {
  const navigate = useNavigate();

  const handleOurStoryClick = () => {
    navigate('/about');
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Introduction Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Content Column */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Est. 1939 • 85+ Years of Excellence
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                    India's <span className="text-primary">Largest Dealer</span> in Rotating Machine & Drives
                  </h1>
                  
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    From humble beginnings in Khambhat to becoming a trusted name across Gujarat, 
                    we've been powering industries for over eight decades.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="px-8 py-6 text-lg">
                    Explore Products
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-6 text-lg"
                    onClick={handleOurStoryClick}
                  >
                    Our Story
                  </Button>
                </div>
              </div>

              {/* Visual Column */}
              <div className="relative">
                <div className="relative z-10 bg-card border border-border rounded-2xl p-8 shadow-xl">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">GE</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">The General Electric Agency</h3>
                        <p className="text-muted-foreground">Since 1939</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 text-card-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">85+ Years of Industry Leadership</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm">Trusted by Industries Nationwide</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Premium Rotating Machines & Drives</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreenComponent;
