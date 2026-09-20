import http from "node:http";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const debtorXml = readFileSync(new URL("../src/tally/get/debiters.xml", import.meta.url), "utf8");
const allowedOrigin = "https://tges-ui-sit.onrender.com";

// Only the bundled debtor export is sent to Tally, never arbitrary browser XML.
export function createTallyConnector({ tallyUrl = "http://127.0.0.1:9000", timeoutMs = 15000 } = {}) {
  return http.createServer(async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Vary", "Origin");
    if (req.headers.origin !== allowedOrigin) {
      res.writeHead(403).end("Origin not allowed");
      req.resume();
      return;
    }
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    if (req.url !== "/tally-api") {
      res.writeHead(404).end("Not found");
      req.resume();
      return;
    }
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Private-Network", "true");
      res.writeHead(204).end();
      return;
    }
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST, OPTIONS");
      res.writeHead(405).end("Method not allowed");
      req.resume();
      return;
    }
    req.resume();
    try {
      const upstream = await fetch(tallyUrl, {
        method: "POST",
        headers: { "Content-Type": "text/xml; charset=UTF-8" },
        body: debtorXml,
        signal: AbortSignal.timeout(timeoutMs),
        redirect: "error",
      });
      const body = await upstream.text();
      res.writeHead(upstream.status, { "Content-Type": "text/xml; charset=UTF-8" }).end(body);
    } catch (error) {
      const timedOut = error.name === "TimeoutError";
      res.writeHead(timedOut ? 504 : 502, { "Content-Type": "text/plain; charset=UTF-8" })
        .end(timedOut ? "Tally took too long to respond." : "Cannot reach Tally. Open Tally and enable its HTTP server on port 9000.");
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createTallyConnector();
  server.on("error", (error) => {
    console.error(`Could not start Tally connector: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(9001, "127.0.0.1", () => {
    console.log(`Tally connector: http://127.0.0.1:9001/tally-api\nAllowed website: ${allowedOrigin}\nKeep this terminal and Tally open.`);
  });
}
