import React from "react";

import ClientsIntroductionComponent from "@ScreenComponents/clients/introductionComponent";
import ClientsIndustriesCardComponent from "@ScreenComponents/clients/industriesCardComponent";
import ClientsLogoComponent from "@ScreenComponents/clients/clientsLogoComponent";

const Clients = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/15 dark:via-gray-900 dark:to-secondary/20" id="clients">
      <ClientsIntroductionComponent />
      <ClientsIndustriesCardComponent />
      <ClientsLogoComponent/>
    </div>
  );
};

export default Clients;
