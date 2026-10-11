import { Button } from "@shadcnComponent/button";
import { BookOpen, ShieldCheck, Sparkles } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { Typography } from "@shadcnComponent/typography";

import HomeStorySheet from "./HomeStorySheet";
import {
  HOME_ESTABLISHED_YEAR,
  homeCapabilities,
  homeIdentityDetails,
  homeLeadText,
  homeTitleLines,
} from "./homeShowcase.constants";

function renderAnimatedText(text, lineIndex) {
  return text.split("").map((character, characterIndex) => {
    const isSpace = character === " ";
    const letterIndex = lineIndex * 18 + characterIndex;

    return (
      <span
        aria-hidden="true"
        className="home-motor-hero__letter"
        key={`${text}-${characterIndex}`}
        style={{
          "--home-letter-index": letterIndex,
          "--home-letter-offset": characterIndex - Math.floor(text.length / 2),
        }}
      >
        {isSpace ? "\u00A0" : character}
      </span>
    );
  });
}

function HomeScreenComponent() {
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const currentYear = moment().year();
  const yearsInBusiness = currentYear - HOME_ESTABLISHED_YEAR;

  useEffect(() => {
    if (!isStoryOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsStoryOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStoryOpen]);

  return (
    <div className="home-motor-hero" id="home">
      <section className="home-motor-hero__shell" aria-label="Home overview">
        <div className="home-motor-hero__surface">
          <div className="home-motor-hero__eyebrow">
            <Sparkles size={15} strokeWidth={2.4} />
            {`Est. 1939 | ${yearsInBusiness} years of industrial excellence`}
          </div>

          <div className="home-motor-hero__frame-label">
            <ShieldCheck size={18} strokeWidth={2.4} />
            <Typography as="span" variant="label">The General Electric Stores</Typography>
          </div>

          <Typography as="h1" variant="display" className="home-motor-hero__kinetic-title">
            <span className="sr-only">
              India's Largest Dealer in Rotating Machine and Drives
            </span>
            {homeTitleLines.map((line, index) => (
              <span
                aria-hidden="true"
                className="home-motor-hero__title-word"
                key={line}
                style={{ "--home-word-index": index }}
              >
                {renderAnimatedText(line, index)}
              </span>
            ))}
          </Typography>

          <Typography variant="bodyLarge" className="home-motor-hero__lead">
            {homeLeadText}
          </Typography>

          <div className="home-motor-hero__capabilities">
            {homeCapabilities.map((capability, index) => {
              const Icon = capability.icon;

              return (
                <div
                  className="home-motor-hero__capability"
                  key={capability.value}
                  style={{ "--home-card-index": index }}
                >
                  <Icon size={18} strokeWidth={2.35} />
                  <Typography as="span" variant="caption">{capability.label}</Typography>
                  <Typography as="strong" variant="label">{capability.value}</Typography>
                </div>
              );
            })}
          </div>

          <div className="home-motor-hero__identity-list">
            {homeIdentityDetails.map((detail, index) => (
              <div
                className="home-motor-hero__identity-item"
                key={detail.label}
                style={{ "--home-card-index": index + homeCapabilities.length }}
              >
                <Typography as="span" variant="caption">{detail.label}</Typography>
                <Typography as="strong" variant="label">{detail.value}</Typography>
              </div>
            ))}
          </div>

          <div className="home-motor-hero__bottom">
            <div className="home-motor-hero__actions">
              <Button
                variant="default"
                size="lg"
                className="home-motor-hero__story-trigger"
                onClick={() => setIsStoryOpen(true)}
              >
                <BookOpen size={18} strokeWidth={2.35} />
                <Typography as="span" variant="label">Our Story</Typography>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isStoryOpen && (
        <HomeStorySheet
          yearsInBusiness={yearsInBusiness}
          onClose={() => setIsStoryOpen(false)}
        />
      )}
    </div>
  );
}

export default HomeScreenComponent;
