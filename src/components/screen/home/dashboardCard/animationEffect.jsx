const HomeDashboardCardAnimationEffect = () => {
  return (
    <>
      <div
        className="absolute top-6 right-4 w-16 h-16 bg-primary/10 rounded-full animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      />
      <div
        className="absolute top-12 right-18 w-8 h-8 bg-secondary/20 rounded-full animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "2s" }}
      />
      <div
        className="absolute top-8 right-1/6 w-4 h-4 bg-primary/30 rounded-full animate-bounce"
        style={{
          animationDelay: "0.5s",
          animationDuration: "2.5s",
        }}
      />
    </>
  );
};

export default HomeDashboardCardAnimationEffect;