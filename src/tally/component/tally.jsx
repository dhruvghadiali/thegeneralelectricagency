import ConnectorDownload from "@Tally/component/connectorDownload";

function Tally() {
  return (
    <main className="w-full">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Tally</h1>
        <div className="ml-auto">
          <ConnectorDownload />
        </div>
      </header>
    </main>
  );
}

export default Tally;
