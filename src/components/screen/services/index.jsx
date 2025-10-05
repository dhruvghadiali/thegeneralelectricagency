import React from "react";

import ServicesIntroductionComponent from "@ScreenComponents/services/introductionComponent";
import ServicesCardComponent from "@ScreenComponents/services/servicesCardComponent";
import { services } from "@/utils/services";

const Services = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10"
      id="services"
    >
      {/* Hero Section */}
      <ServicesIntroductionComponent />

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              return <ServicesCardComponent service={service} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
