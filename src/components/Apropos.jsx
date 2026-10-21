import React from "react";
import "../styles/Apropos.css";
import FadeInSection from "./FadeInSection";
import {
  SiLinux, SiGnubash, SiGit, SiPython, SiTypescript, SiReact, SiNextdotjs,
} from "react-icons/si";
import { DiDotnet } from "react-icons/di";

// Key = the exact text shown in the list below. No colour = follows the text colour.
const TECH = {
  ".NET 8":     { icon: DiDotnet,     color: "#8A6BF0" },
  "Linux":      { icon: SiLinux,      color: "#FCC624" },
  "Bash":       { icon: SiGnubash,    color: "#4EAA25" },
  "Git":        { icon: SiGit,        color: "#F05032" },
  "Python":     { icon: SiPython,     color: "#4B8BBE" },
  "Typescript": { icon: SiTypescript, color: "#3178C6" },
  "React.js":   { icon: SiReact,      color: "#61DAFB" },
  "Next.js":    { icon: SiNextdotjs },
};

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
              {techStack.map((techItem, i) => {
                const t = TECH[techItem];
                const Icon = t && t.icon;
                return (
                  <FadeInSection key={techItem} delay={(i + 1) * 100 + "ms"}>
                    <li>
                      {Icon && <Icon size={20} color={t.color} aria-hidden="true" />}
                      <span>{techItem}</span>
                    </li>
                  </FadeInSection>
                );
              })}
            </ul>
          </div>
          <div className="Apropos-image">
            <img alt="Afnane Lamriss" src={`${import.meta.env.BASE_URL}assets/me2.jpg`} />
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Apropos;