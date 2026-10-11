function PlaceholderScreen({ eyebrow, title, description }) {
  return (
    <main className="w-full space-y-5 pb-8">
      <section>
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </section>
    </main>
  );
}

export default PlaceholderScreen;
