import assert from "node:assert/strict";
import http from "node:http";
import { test } from "node:test";
import { createTallyConnector } from "./tally-connector.mjs";

const origin = "https://tges-ui-sit.onrender.com";
async function listen(server, t) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  return `http://127.0.0.1:${server.address().port}`;
}

test("preflight allows the Render origin and XML content type", async (t) => {
  const url = await listen(createTallyConnector(), t);
  const response = await fetch(`${url}/tally-api`, {
    method: "OPTIONS",
    headers: { Origin: origin, "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type" },
  });
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
  assert.equal(response.headers.get("access-control-allow-headers"), "Content-Type");
});

test("rejects untrusted and missing origins, unknown routes, and unsupported methods", async (t) => {
  const url = await listen(createTallyConnector(), t);
  for (const headers of [{}, { Origin: "https://untrusted.example" }]) {
    const response = await fetch(`${url}/tally-api`, { method: "POST", headers });
    assert.equal(response.status, 403);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
  }
  assert.equal((await fetch(`${url}/other`, { headers: { Origin: origin } })).status, 404);
  assert.equal((await fetch(`${url}/tally-api`, { headers: { Origin: origin } })).status, 405);
});

test("exports company ledgers using fixed XML and returns the Tally response", async (t) => {
  let received = "";
  const tally = await listen(http.createServer(async (req, res) => {
    for await (const chunk of req) received += chunk;
    res.end("<ENVELOPE><LEDGER NAME='Example'/></ENVELOPE>");
  }), t);
  const url = await listen(createTallyConnector({ tallyUrl: tally }), t);
  const response = await fetch(`${url}/tally-api`, {
    method: "POST", headers: { Origin: origin, "Content-Type": "text/xml" }, body: "untrusted XML",
  });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /LEDGER NAME='Example'/);
  assert.match(received, /<TALLYREQUEST>EXPORT<\/TALLYREQUEST>/);
  assert.match(received, /<SVCURRENTCOMPANY>THE GENERAL ELECTRIC STORES<\/SVCURRENTCOMPANY>/);
  assert.match(received, /<TYPE>Ledger<\/TYPE>/);
  assert.doesNotMatch(received, /<CHILDOF>|GroupSundryDebtors/);
  assert.ok(!received.includes("untrusted XML"));
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
});

test("upstream connection failures retain CORS headers", async (t) => {
  const tally = await listen(http.createServer((_req, res) => res.destroy()), t);
  const url = await listen(createTallyConnector({ tallyUrl: tally }), t);
  const response = await fetch(`${url}/tally-api`, { method: "POST", headers: { Origin: origin } });
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
});

test("upstream timeout returns 504", async (t) => {
  const tally = await listen(http.createServer(() => {}), t);
  const url = await listen(createTallyConnector({ tallyUrl: tally, timeoutMs: 30 }), t);
  const response = await fetch(`${url}/tally-api`, { method: "POST", headers: { Origin: origin } });
  assert.equal(response.status, 504);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
});
