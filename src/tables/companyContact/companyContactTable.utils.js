import {
  CONTACT_PERSON_POSITIONS,
  CONTACT_POSITION_LABELS,
} from "@Enums";

export function normalizedContactPosition(position) {
  return CONTACT_POSITION_LABELS[position]
    ? position
    : CONTACT_PERSON_POSITIONS.OTHER;
}

export function contactPositionLabel(position) {
  return CONTACT_POSITION_LABELS[normalizedContactPosition(position)];
}
