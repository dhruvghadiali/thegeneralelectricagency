import { Badge } from "@shadcnComponent/badge";
import {
  CONTACT_PERSON_POSITIONS,
  CONTACT_POSITION_LABELS,
} from "@Enums";

const CONTACT_POSITION_BADGE_CLASSES = Object.freeze({
  [CONTACT_PERSON_POSITIONS.OWNER]:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  [CONTACT_PERSON_POSITIONS.DIRECTOR]:
    "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300",
  [CONTACT_PERSON_POSITIONS.MANAGER]:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  [CONTACT_PERSON_POSITIONS.HR]:
    "border-pink-200 bg-pink-50 text-pink-700 dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-300",
  [CONTACT_PERSON_POSITIONS.ACCOUNTS]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  [CONTACT_PERSON_POSITIONS.PURCHASE]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  [CONTACT_PERSON_POSITIONS.SALES]:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300",
  [CONTACT_PERSON_POSITIONS.STORE_KEEPER]:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
  [CONTACT_PERSON_POSITIONS.ENGINEER]:
    "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-300",
  [CONTACT_PERSON_POSITIONS.OTHER]:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300",
});

function ContactPositionBadge({ position, className }) {
  const normalizedPosition = CONTACT_POSITION_LABELS[position]
    ? position
    : CONTACT_PERSON_POSITIONS.OTHER;

  return (
    <Badge
      variant="outline"
      className={`${CONTACT_POSITION_BADGE_CLASSES[normalizedPosition]} ${className ?? ""}`}
    >
      {CONTACT_POSITION_LABELS[normalizedPosition]}
    </Badge>
  );
}

export default ContactPositionBadge;
