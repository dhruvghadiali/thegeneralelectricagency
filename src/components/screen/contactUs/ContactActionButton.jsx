import { Typography } from "@/components/ui/typography";

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
          <Typography as="span" variant="label" className="contact-showcase__action-label contact-showcase__action-label--desktop">
            {label}
          </Typography>
          <Typography as="span" variant="label" className="contact-showcase__action-label contact-showcase__action-label--mobile">
            {mobileLabel}
          </Typography>
        </>
      ) : (
        <Typography as="span" variant="label">{label}</Typography>
      )}
      {TrailingIcon && <TrailingIcon size={15} strokeWidth={2.5} />}
    </button>
  );
}

export default ContactActionButton;
