import React from "react";
import "../styles/Apropos.css";
import FadeInSection from "./FadeInSection";

const Apropos = () => {
  const one = (
  <p>
    Je suis <b>étudiante en ingénierie logicielle et IA</b> à l&apos;ENSAO,
    passionnée par la création de logiciels utiles. J&apos;aime travailler sur
    toute la chaîne, du backend <b>.NET 8</b> jusqu&apos;au déploiement, entre{" "}
    <b>Linux</b>, <b>DevOps</b> et infrastructure. J&apos;ai déjà effectué des
    stages chez Technologica et à Code Plus, et j&apos;ai remporté la 1ère place
    au MIATHON 2026. Je recherche actuellement un <b>stage PFE</b>.
  </p>
  );


  const techStack = [
    ".NET 8",
    "Linux",
    "Bash",
    "Git",
    "Python",
    "Typescript",
    "React.js",
    "Next.js",

  ];

  return (
    <div id="Apropos">
      <FadeInSection>
        <div className="section-header ">
          <span className="section-title">/ À propos de moi </span>
        </div>
        <div className="Apropos-content">
          <div className="Apropos-description">
            {one}
            {"Voici quelques technologies avec lesquelles je travaille:"}
            <ul className="tech-stack">
              {techStack.map((techItem, i) => (
                <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                  <li>{techItem}</li>
                </FadeInSection>
              ))}
            </ul>
          </div>
          <div className="Apropos-image">
            <img alt="Afnane Lamriss" src={"/assets/me2.jpg"} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Apropos;
