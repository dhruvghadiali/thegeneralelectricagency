function ProductDetail({ label, value, className = "" }) {
  return (
    <div className={`rounded-lg border bg-muted/20 p-3 ${className}`}>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-sm font-medium">{value}</dd>
    </div>
  );
}

export default ProductDetail;
