const HomeDashboardCardProgressIndicator = () => {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - 1939;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-6">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-primary/20"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="271.2"
            strokeDashoffset="62.8"
            className="text-primary transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{yearsInBusiness}</div>
            <div className="text-xs text-muted-foreground">Years</div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-center text-foreground mb-2">
        Legacy of Excellence
      </h3>
      <p className="text-center text-muted-foreground text-sm max-w-xs">
        From 1939 to today, powering industries with innovation and reliability
      </p>
    </div>
  );
};

export default HomeDashboardCardProgressIndicator;
