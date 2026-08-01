import { Sparkles, X } from "lucide-react";

import useScrollLock from "@/utils/useScrollLock";
import { storyMilestones } from "./homeShowcase.constants";
import { Typography } from "@/components/ui/typography";

function HomeStorySheet({ yearsInBusiness, onClose }) {
  // This component only mounts while the sheet is open.
  useScrollLock(true);

  return (
    <div
      className="home-story-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-story-sheet-title"
    >
      <button
        type="button"
        className="home-story-sheet__overlay"
        aria-label="Close story"
        onClick={onClose}
      />

      <section className="home-story-sheet__content" data-lenis-prevent>
        <div className="home-story-sheet__handle" aria-hidden="true" />

        <button
          type="button"
          className="home-story-sheet__close"
          aria-label="Close story"
          onClick={onClose}
        >
          <X size={18} strokeWidth={2.4} />
        </button>

        <div className="home-story-sheet__header">
          <Typography as="span" variant="overline">
            <Sparkles size={15} strokeWidth={2.4} />
            Est. 1939 | {yearsInBusiness} years
          </Typography>
          <Typography as="h2" variant="sheetTitle" id="home-story-sheet-title">The General Electric Stores</Typography>
          <Typography variant="body">
            From a humble electrical store in Khambhat to a trusted name in
            rotating machines and drives, our journey has been built on family
            ownership, industrial relationships, and dependable service.
          </Typography>
        </div>

        <div className="home-story-sheet__timeline">
          {storyMilestones.map((milestone, index) => (
            <article
              className="home-story-sheet__milestone"
              key={milestone.year}
              style={{ "--story-card-index": index }}
            >
              <Typography as="strong" variant="overline">{milestone.year}</Typography>
              <Typography as="span" variant="cardTitle">{milestone.title}</Typography>
              <Typography variant="bodySmall">{milestone.description}</Typography>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeStorySheet;
