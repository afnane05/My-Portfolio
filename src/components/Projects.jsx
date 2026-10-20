import React, { useEffect, useRef, useState } from "react";
import "../styles/Projects.css";
import "../styles/ProjectsGallery.css";
import FadeInSection from "./FadeInSection";
import ExternalLinks from "./ExternalLinks";

/* ------------------------------------------------------------------ */
/*  CONFIG                                                             */
/* ------------------------------------------------------------------ */

// Delay between automatic slides (ms). Only used when a project has autoPlay: true.
const AUTO_DELAY = 4500;

// All media live at the root of /public. If you move them into a folder
// (e.g. /public/media), change this to: (file) => `/media/${file}`
const src = (file) => `${import.meta.env.BASE_URL}${file}`;

// Helpers: img(file, title, description, stack) / vid(file, title, description, stack)
// -> fill in `description` and `stack` yourself. Stack is comma-separated: "React, Tailwind"
const img = (file, title, description = "", stack = "") => ({
  type: "image", file, title, description, stack,
});
const vid = (file, title, description = "", stack = "") => ({
  type: "video", file, title, description, stack,
});

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const projects = [
  {
    id: "talk2job",
    title: "Talk2Job",
    logo: "Talk2Job_Logo.png",
    desc: "Plateforme de préparation aux entretiens en architecture microservices : matching CV-offres, simulation d'entretiens par IA avec interaction vocale, et génération de feedback détaillé.",
    techStack: "FastAPI, Gemini / Groq, Whisper, Edge TTS, PostgreSQL, Docker, Microservices, Git",
    link: "https://github.com/afnane05/Talk2Job",
    autoPlay: false,
    sections: [
      {
        name: "Démo",
        items: [
          vid("Interview.mp4", "Interview"),
          vid("Feedback.mp4", "Feedback"),
        ],
      },
    ],
  },
  {
    id: "technologica",
    title: "Technologica",
    logo: "Technologica_Logo.png",
    desc: "ERP développé pendant mon stage de 4ème année : gestion des clients, fournisseurs, stocks, devis, bons de commande et factures, avec un agent IA conversationnel (écrit et vocal) et un pipeline d'OCR de factures.",
    techStack: "ASP.NET Core (.NET 8), Next.js, FastAPI, Celery, Redis, LangChain, Edge TTS, Whisper, PostgreSQL",
    link: "https://github.com/afnane05/Technologica_Stage",
    autoPlay: true,
    sections: [
      { name: "Dashboard", items: [img("Dashboard.png", "Dashboard")] },
      {
        name: "OCR Operator",
        items: [1, 2, 3, 4, 5, 6].map((n) =>
          img(`a${n}.png`, `OCR Operator ${n}`)
        ),
      },
      {
        name: "Logica AI",
        items: [1, 2, 3, 4].map((n) => img(`ai${n}.png`, `Logica AI ${n}`)),
      },
    ],
  },
  {
    id: "orderflow",
    title: "OrderFlow Monitoring",
    logo: "Monitoring_Logo.png",
    desc: "Backend e-commerce en Clean Architecture avec CQRS / MediatR, cache Redis, Materialized View pour la lecture, traitement asynchrone des commandes et supervision avec Prometheus, Grafana et Loki.",
    techStack: ".NET 8, Entity Framework Core, SQL Server, Redis, Prometheus, Grafana, Jaeger, Postman",
    link: "https://github.com/afnane05/OrderFlow_CodePLus",
    autoPlay: false,
    sections: [
      { name: "Grafana", items: [img("Grafana.png", "Grafana")] },
      { name: "Health check", items: [img("HealthCheck.png", "Health check")] },
      {
        name: "High pending rate",
        items: [img("HighPendingRate.png", "High pending rate")],
      },
      { name: "Jaeger", items: [img("Jaeger.png", "Jaeger")] },
    ],
  },
  {
    id: "skillloop",
    title: "SkillLoop",
    logo: "SkillLoop_Logo.png",
    desc: "plateforme d’apprentissage entre pairs où chaque utilisateur peut à la fois enseigner et apprendre. Les utilisateurs gagnent des crédits en enseignant et les dépensent pour réserver des sessions. Projet backend réalisé en équipe avec ASP.NET Core Web API, EF Core et SQL Server, incluant l’authentification JWT, un portefeuille de crédits avec historique des transactions, un chat en temps réel via SignalR et une réservation transactionnelle qui empêche la double réservation de la dernière place. Un worker en arrière-plan clôture automatiquement les sessions terminées. API documentée avec Swagger.",
    techStack: "ASP.NET Core (.NET 8), Entity Framework Core, SQL Server, JWT authentication, SignalR, Background worker, Git",
    link: "", // ← paste the GitHub URL here (button hidden while empty)
    autoPlay: false,
    sections: [
      {
        name: "Layout",
        items: [
          img("DiscoverExplore.png", "Discover & Explore"),
          img("ProfileCourse.png", "Profile & Course"),
          img("BookingPayment.png", "Booking & Payment"),
        ],
      },
      { name: "Teamwork", items: [img("Git.png", "Git")] },
      { name: "Backend", items: [img("Swagger.png", "Swagger")] },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  SMALL PIECES                                                       */
/* ------------------------------------------------------------------ */

const Chips = ({ value }) => {
  const list = value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!list.length) return null;
  return (
    <ul className="pg-chips">
      {list.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
};

const Chevron = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  SLIDER                                                             */
/* ------------------------------------------------------------------ */

const Slider = ({ items, sectionName, autoPlay, onOpen }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const trackRef = useRef(null);
  const n = items.length;
  const multi = n > 1;
  const go = (d) => setI((c) => (c + d + n) % n);

  // Automatic sliding (restarts after every manual move, stops on hover/focus/video play)
  useEffect(() => {
    if (!autoPlay || !multi || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((c) => (c + 1) % n), AUTO_DELAY);
    return () => clearTimeout(t);
  }, [autoPlay, multi, paused, i, n]);

  // Pause videos that are no longer on screen
  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.querySelectorAll(".pg-slide").forEach((s, idx) => {
      if (idx !== i) s.querySelectorAll("video").forEach((v) => v.pause());
    });
  }, [i]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const item = items[i];

  return (
    <div className="pg-window">
      <div className="pg-bar">
        <span className="pg-lights" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="pg-bar-title">{sectionName}</span>
        {multi && (
          <span className="pg-count" aria-live="polite">
            {i + 1} / {n}
          </span>
        )}
      </div>

      <div
        className="pg-stage"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="pg-track"
          ref={trackRef}
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {items.map((it, idx) => (
            <div className="pg-slide" key={it.file} aria-hidden={idx !== i}>
              {it.type === "video" ? (
                <video
                  src={src(it.file)}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setPaused(true)}
                />
              ) : (
                <button
                  type="button"
                  className="pg-zoom"
                  tabIndex={idx === i ? 0 : -1}
                  onClick={() => onOpen(it)}
                  aria-label={`Agrandir : ${it.title}`}
                >
                  <img src={src(it.file)} alt={it.title} loading="lazy" />
                </button>
              )}
            </div>
          ))}
        </div>

        {multi && (
          <>
            <button
              type="button"
              className="pg-arrow pg-arrow--prev"
              onClick={() => go(-1)}
              aria-label="Précédent"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className="pg-arrow pg-arrow--next"
              onClick={() => go(1)}
              aria-label="Suivant"
            >
              <Chevron dir="right" />
            </button>
            <div className="pg-dots">
              {items.map((it, idx) => (
                <button
                  type="button"
                  key={it.file}
                  className={idx === i ? "is-active" : ""}
                  onClick={() => setI(idx)}
                  aria-label={`Aller à : ${it.title}`}
                />
              ))}
            </div>
          </>
        )}

        {autoPlay && multi && !paused && (
          <span
            key={i}
            className="pg-progress"
            style={{ animationDuration: `${AUTO_DELAY}ms` }}
          />
        )}
      </div>

      {/* Caption of the current element: title always, description + stack when filled */}
      <div className="pg-caption" key={item.file}>
        <h4>{item.title}</h4>
        {item.description && <p>{item.description}</p>}
        <Chips value={item.stack} />
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PROJECT FRAME                                                      */
/* ------------------------------------------------------------------ */

const Frame = ({ project, onOpen }) => {
  const [s, setS] = useState(0);
  const section = project.sections[s];

  return (
    <article className="pg-frame">
      <header className="pg-head">
        {project.logo && (
          <img className="pg-logo" src={src(project.logo)} alt={`Logo ${project.title}`} />
        )}
        <div className="pg-head-text">
          <h3>{project.title}</h3>
          {project.desc && <p>{project.desc}</p>}
          <Chips value={project.techStack} />
        </div>
        {project.link && <ExternalLinks githubLink={project.link} />}
      </header>

      {project.sections.length > 1 && (
        <div className="pg-tabs" role="tablist" aria-label={project.title}>
          {project.sections.map((sec, idx) => (
            <button
              type="button"
              role="tab"
              key={sec.name}
              aria-selected={idx === s}
              className={idx === s ? "is-active" : ""}
              onClick={() => setS(idx)}
            >
              {sec.name}
              <span>{sec.items.length}</span>
            </button>
          ))}
        </div>
      )}

      <Slider
        key={`${project.id}-${s}`}
        items={section.items}
        sectionName={section.name}
        autoPlay={project.autoPlay}
        onOpen={onOpen}
      />
    </article>
  );
};

/* ------------------------------------------------------------------ */
/*  SECTION                                                            */
/* ------------------------------------------------------------------ */

const Projects = () => {
  const [light, setLight] = useState(null);

  useEffect(() => {
    if (!light) return;
    const onKey = (e) => e.key === "Escape" && setLight(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light]);

  return (
    <div id="projects">
      <div className="section-header ">
        <span className="section-title">/ logiciels</span>
        <a
          href="https://github.com/afnane05"
          className="explore-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all projects
        </a>
      </div>

      <div className="pg-list">
        {projects.map((p, idx) => (
          <FadeInSection key={p.id} delay={(idx + 1) * 100 + "ms"}>
            <Frame project={p} onOpen={setLight} />
          </FadeInSection>
        ))}
      </div>

      {light && (
        <div
          className="pg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={light.title}
          onClick={() => setLight(null)}
        >
          <img src={src(light.file)} alt={light.title} />
          <button type="button" aria-label="Fermer" onClick={() => setLight(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;