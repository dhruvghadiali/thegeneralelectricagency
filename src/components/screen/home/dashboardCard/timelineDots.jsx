import moment from "moment";

const HomeDashboardCardTimelineDots = () => {
  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
        <span className="text-xs text-muted-foreground mt-1">1939</span>
      </div>
      <div className="w-8 h-px bg-primary/30"></div>
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 bg-secondary rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <span className="text-xs text-muted-foreground mt-1">Growth</span>
      </div>
      <div className="w-8 h-px bg-primary/30"></div>
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 bg-primary rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <span className="text-xs text-muted-foreground mt-1">{moment().format("YYYY")}</span>
      </div>
    </div>
  );
};

export default HomeDashboardCardTimelineDots;
