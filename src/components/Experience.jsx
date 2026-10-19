import React from "react";
import JobList from "./JobList";
import "../styles/Experience.css";
import FadeInSection from "./FadeInSection";

const timeline = [
  { company: "CodePlus", start: "Aug 24, 2026", end: "Oct 15, 2026" },
  { company: "Technologica", start: "Aug 1, 2026", end: "Oct 1, 2026" },
  { company: "BestSeller", start: "Mar 2026", end: "May 2026" },
  { company: "DRSPO", start: "Aug 1, 2025", end: "Sep 1, 2025" },
];

const Experience = () => {
  return (
    <div id="experience">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ experience</span>
        </div>

        <ol className="experience-timeline">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.company}>
              <span className="timeline-dot" />
              <span className="timeline-company">{item.company}</span>
              <span className="timeline-dates">
                {item.start} → {item.end}
              </span>
            </li>
          ))}
        </ol>

        <JobList />
      </FadeInSection>
    </div>
  );
};

export default Experience;