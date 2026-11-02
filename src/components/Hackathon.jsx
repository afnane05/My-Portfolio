import React from "react";
import "../styles/Projects.css";
import "../styles/Hackathon.css";
import FadeInSection from "./FadeInSection";

// Works under a GitHub Pages sub-path (base) as well as at the root
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

// Renders **bold** markers inside a string as <strong>
const rich = (text) =>
  text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));

const hackathon = {
  title: "MIATHON 2026 · 1ère place",
  desc: "Création d'un appareil électronique de détection du diabète, des maladies rénales et pulmonaires à partir d'analyses d'urine humaine, ainsi qu'une application mobile qui reçoit les résultats des tests depuis une carte ESP32 insérée dans l'appareil et aide l'utilisateur à suivre son état.",
  techStack: "ESP32, APPLICATION MOBILE, CAPTEURS",

  // side: position of the IMAGE ("right" -> text on the left, "left" -> text on the right)
  rows: [
    {
      side: "right",
      src: asset("assets/hackathon.jpg"),
      alt: "Présentation du projet au MIATHON 2026",
      heading: "Le projet",
      lead: "Un **appareil médical de dépistage** qui analyse l'**urine humaine** pour détecter le **diabète**, les **maladies rénales** et les **maladies pulmonaires**, en une seule analyse.",
      paragraphs: [
        "L'échantillon est examiné par des **capteurs spécifiques** qui mesurent les marqueurs présents dans l'urine. Cette approche repose sur une **théorie scientifiquement prouvée et fiable** : l'urine contient des indicateurs mesurables de ces pathologies.",
      ],
      points: [
        {
          title: "Un dépistage simple",
          text: "Un échantillon d'urine suffit : une méthode non invasive, rapide et accessible.",
        },
        {
          title: "Trois familles de maladies",
          text: "Diabète, maladies rénales et maladies pulmonaires sont détectés par le même appareil.",
        },
        {
          title: "Des résultats connectés",
          text: "Les mesures sont transmises à une application mobile grâce à une carte ESP32 intégrée à l'appareil.",
        },
      ],
      tags: ["Capteurs", "Urine", "ESP32", "Dépistage"],
    },
    {
      side: "left",
      src: asset("assets/hackathon1.jpg"),
      alt: "Notre équipe au MIATHON 2026",
      heading: "L'équipe",
      lead: "**6 étudiants** issus de **2 filières complémentaires**, réunis pour construire un appareil fonctionnel de bout en bout : du capteur jusqu'à l'écran du patient.",
      points: [
        {
          title: "4 membres GSEIR",
          text: "Génie des Systèmes Électroniques, Informatique et Réseaux. Ils ont pris en charge toute la **partie matérielle** : choix et intégration des **capteurs**, **microprocesseur** et **développement Arduino**.",
          chips: ["Capteurs", "Microprocesseur", "Arduino"],
        },
        {
          title: "2 membres GI",
          text: "Génie Informatique. Ils ont développé l'**application numérique** qui permet de recevoir le **diagnostic** et les **résultats du patient**.",
          chips: ["Application", "Diagnostic", "Résultats patient"],
        },
      ],
    },
    {
      side: "right",
      src: asset("assets/hackathon2.jpg"),
      alt: "Remise du prix, 1ère place au MIATHON 2026",
      heading: "Ma contribution",
      lead: "Responsable de l'**application mobile** et de la **liaison entre l'appareil médical et le téléphone**.",
      points: [
        {
          title: "Application Android",
          text: "Développée avec **Kotlin** et **Android Studio** : elle reçoit les résultats des tests et aide l'utilisateur à suivre son état.",
          chips: ["Kotlin", "Android Studio"],
        },
        {
          title: "Connexion de l'appareil",
          text: "Configuration du **trafic HTTP de l'ESP32** pour connecter l'appareil médical à l'application et recevoir **toutes les informations** mesurées.",
          chips: ["ESP32", "HTTP"],
        },
      ],
    },
  ],
};

const Chips = ({ items }) => (
  <ul className="pg-chips">
    {items.map((t) => (
      <li key={t}>{t}</li>
    ))}
  </ul>
);

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

      <div className="hk-rows">
        {hackathon.rows.map((row, i) => (
          <FadeInSection key={row.heading} delay={(i + 1) * 100 + "ms"}>
            <article
              className={`hk-row ${row.side === "right" ? "hk-row--img-right" : "hk-row--img-left"}`}
            >
              <figure className="hk-media">
                <img src={row.src} alt={row.alt} loading="lazy" />
              </figure>

              <div className="hk-text">
                <h3>{row.heading}</h3>

                {row.lead && <p className="hk-lead">{rich(row.lead)}</p>}

                {row.paragraphs &&
                  row.paragraphs.map((p) => <p key={p}>{rich(p)}</p>)}

                {row.points && (
                  <ul className="hk-points">
                    {row.points.map((pt) => (
                      <li key={pt.title}>
                        <strong className="hk-point-title">{pt.title}</strong>
                        <span>{rich(pt.text)}</span>
                        {pt.chips && <Chips items={pt.chips} />}
                      </li>
                    ))}
                  </ul>
                )}

                {row.tags && <Chips items={row.tags} />}
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </div>
  );
};

export default Hackathon;