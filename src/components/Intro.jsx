import React from "react";
import "../styles/Intro.css";
import { TypeAnimation } from "react-type-animation";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FadeInSection from "./FadeInSection";
import AsciiPortrait from "./AsciiPortrait"
const Intro = () => {
  return (
    <div id="intro">
      <div className="intro-simulation">
        <AsciiPortrait />
      </div>
      <div className="intro-block">
        <div className="intro-title">
          {"Bonjour, c'est "}
          <span className="intro-name">
            <TypeAnimation
              sequence={["Afnane"]}
              wrapper="span"
              cursor={false}
              repeat={0}
            />
          </span>

          <span className="intro-cursor">|</span>
        </div>
        <FadeInSection>
          <div className="intro-desc">
            Étudiante en ingénierie logicielle et IA à l'ENSAO, j'aime concevoir des logiciels utiles, fiables et bien structurés. Je travaille avec .NET pour le développement backend, j'évolue au quotidien sur Linux, et je m'intéresse au DevOps et à l'infrastructure : conteneurisation, CI/CD et déploiement. Je cherche à comprendre un projet de bout en bout, du code jusqu'à sa mise en production.  
          </div>
          <a href="mailto:afnanelamriss475@gmail.com" className="intro-contact">
            <EmailRoundedIcon />
            {" dit bonjour !"}
          </a>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Intro;
