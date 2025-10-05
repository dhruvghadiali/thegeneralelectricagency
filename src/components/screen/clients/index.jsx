import React from "react";

import ClientsIntroductionComponent from "@ScreenComponents/clients/introductionComponent";
import ClientsIndustriesCardComponent from "@ScreenComponents/clients/industriesCardComponent";
import ClientsLogoComponent from "@ScreenComponents/clients/clientsLogoComponent";

const Clients = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/10">
      <ClientsIntroductionComponent />
      <ClientsIndustriesCardComponent />
      <ClientsLogoComponent/>
    </div>
  );
};

export default Clients;
