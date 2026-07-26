import { Sparkles, X } from "lucide-react";

import { storyMilestones } from "./homeShowcase.constants";

function HomeStorySheet({ yearsInBusiness, onClose }) {
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

      <section className="home-story-sheet__content">
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
          <span>
            <Sparkles size={15} strokeWidth={2.4} />
            Est. 1939 | {yearsInBusiness} years
          </span>
          <h2 id="home-story-sheet-title">The General Electric Stores</h2>
          <p>
            From a humble electrical store in Khambhat to a trusted name in
            rotating machines and drives, our journey has been built on family
            ownership, industrial relationships, and dependable service.
          </p>
        </div>

        <div className="home-story-sheet__timeline">
          {storyMilestones.map((milestone, index) => (
            <article
              className="home-story-sheet__milestone"
              key={milestone.year}
              style={{ "--story-card-index": index }}
            >
              <strong>{milestone.year}</strong>
              <span>{milestone.title}</span>
              <p>{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeStorySheet;
