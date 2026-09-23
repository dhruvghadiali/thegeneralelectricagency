import { Download } from "lucide-react";
import { Button } from "@shadcnComponent/button";
import connectorUrl from "@Assets/connector/TGES-Connector.exe?url";

function ConnectorDownload() {
  return (
    <Button asChild>
      <a href={connectorUrl} download="TGES-Connector.exe">
        <Download className="size-4" aria-hidden="true" />
        Tally Connector
      </a>
    </Button>
  );
}

export default ConnectorDownload;
