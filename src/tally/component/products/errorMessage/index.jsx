function ProductsErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p role="alert" className="mt-2 text-sm text-destructive">
      {message}
    </p>
  );
}

export default ProductsErrorMessage;
