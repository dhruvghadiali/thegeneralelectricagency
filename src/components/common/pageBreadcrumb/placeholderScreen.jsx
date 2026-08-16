import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

function PlaceholderScreen({ eyebrow, title, description, showDashboardParent = true }) {
  return (
    <main className="w-full space-y-5 pb-8">
      <PageBreadcrumb
        items={
          showDashboardParent
            ? [{ label: "Dashboard", href: "/dashboard" }, { label: title }]
            : [{ label: title }]
        }
      />
      <section>
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </section>
    </main>
  );
}

export default PlaceholderScreen;
