function ContactActionButton({
  label,
  mobileLabel,
  Icon,
  TrailingIcon,
  onClick,
}) {
  return (
    <button type="button" onClick={onClick}>
      {Icon && <Icon size={15} strokeWidth={2.5} />}
      {mobileLabel ? (
        <>
          <span className="contact-showcase__action-label contact-showcase__action-label--desktop">
            {label}
          </span>
          <span className="contact-showcase__action-label contact-showcase__action-label--mobile">
            {mobileLabel}
          </span>
        </>
      ) : (
        <span>{label}</span>
      )}
      {TrailingIcon && <TrailingIcon size={15} strokeWidth={2.5} />}
    </button>
  );
}

export default ContactActionButton;
