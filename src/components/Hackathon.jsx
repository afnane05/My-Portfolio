import React from "react";
import "../styles/Projects.css";
import "../styles/Hackathon.css";
import FadeInSection from "./FadeInSection";

// Works under a GitHub Pages sub-path (base) as well as at the root
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const hackathon = {
  title: "MIATHON 2026 · 1ère place",
  desc: "Création d'un appareil électronique de détection du diabète, des maladies rénales et pulmonaires à partir d'analyses d'urine humaine, ainsi qu'une application mobile qui reçoit les résultats des tests depuis une carte ESP32 insérée dans l'appareil et aide l'utilisateur à suivre son état.",
  techStack: "ESP32, APPLICATION MOBILE, CAPTEURS",
  images: [
    { src: asset("assets/hackathon.jpg"), alt: "Notre équipe au MIATHON 2026" },
    { src: asset("assets/hackathon1.jpg"), alt: "Présentation du projet au MIATHON 2026" },
    { src: asset("assets/hackathon2.jpg"), alt: "Remise du prix, 1ère place au MIATHON 2026" },
  ],
};

const Hackathon = () => {
  return (
    <div id="Hackathon">
      <div className="section-header">
        <span className="section-title">/ Hackathon</span>
      </div>

      <FadeInSection delay="100ms">
        <div className="hackathon-intro">
          <div className="card-title">{hackathon.title}</div>
          <div className="card-desc">{hackathon.desc}</div>
          <div className="card-tech">{hackathon.techStack}</div>
        </div>
      </FadeInSection>

      <div className="project-container">
        <ul className="projects-grid">
          {hackathon.images.map((img, i) => (
            <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
              <li className="projects-card transparent-card">
                <div className="project-image-container">
                  <img src={img.src} alt={img.alt} className="project-image" />
                </div>
              </li>
            </FadeInSection>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Hackathon;