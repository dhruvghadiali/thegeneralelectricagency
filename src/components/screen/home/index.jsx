import HomeDashboardCard from "@ScreenComponents/home/dashboardCard";
import HomeIntroductionComponent from "@ScreenComponents/home/introductionComponent";

function HomeScreenComponent() {
  return (
    <div className="bg-background" id="home">
      {/* Hero Introduction Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <HomeIntroductionComponent />

              {/* Visual Column */}
              <HomeDashboardCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreenComponent;
