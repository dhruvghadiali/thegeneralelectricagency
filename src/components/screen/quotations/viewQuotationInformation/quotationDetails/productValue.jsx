function ProductValue({ label, children, emphasized = false }) {
  return (
    <div className={emphasized ? "rounded-md bg-primary/5 p-2" : "p-2"}>
      <dt className="text-[11px] text-muted-foreground">{label}</dt>
      <dd className={emphasized ? "mt-1 text-sm font-semibold" : "mt-1 text-sm"}>
        {children}
      </dd>
    </div>
  );
}

export default ProductValue;

