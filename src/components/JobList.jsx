import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { createPortal } from "react-dom";
import FadeInSection from "./FadeInSection";

// Files in /public, safe under a GitHub Pages sub-path (base)
const asset = (file) => `${import.meta.env.BASE_URL}${file}`;

function TabPanel(props) {
  const { children, value, index, isMobile, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={isMobile ? `full-width-tabpanel-${index}` : `vertical-tabpanel-${index}`}
      aria-labelledby={isMobile ? `full-width-tab-${index}` : `vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isMobile: PropTypes.bool
};

function a11yProps(index, isMobile) {
  if (isMobile) {
    return {
      id: "full-width-tab-" + index,
      "aria-controls": "full-width-tabpanel-" + index,
    };
  } else {
    return {
      id: "vertical-tab-" + index,
      "aria-controls": "vertical-tabpanel-" + index,
    };
  }
}

const JobList = () => {
  const [value, setValue] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(null);

  React.useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const experienceItems = {
    "Code Plus": {
      jobTitle: "Formation Backend .NET @",
      duration: "CERTIFICAT DE COMPLÉTION",
      desc: [
        "Formation pratique couvrant le cycle de vie d'une application .NET, le caching et les Background Jobs",
        "Mise en place de la supervision et de l'observabilité avec Prometheus et Grafana",
      ],
      certificate: "StageCodePlus.png",
    },
    Technologica: {
      jobTitle: "Stagiaire Ingénieure Logiciel @",
      duration: "STAGE 4ÈME ANNÉE · 2 MOIS",
      desc: [
        "Conçu et développé un ERP en Clean Architecture, structuré en 3 services : backend ASP.NET Core / .NET 8, frontend Next.js et service IA FastAPI / Python, communiquant via des API REST",
        "Développé Logica AI, un agent conversationnel écrit et vocal basé sur le Function Calling (LangChain, Groq), avec outils typés Pydantic, validation humaine des actions sensibles et interactions vocales via Whisper et Edge TTS",
        "Conçu un pipeline d'OCR de factures d'achat (OpenCV, pdf2image, Tesseract) avec extraction structurée assistée par LLM, score de confiance par champ et traitement asynchrone des imports via RQ / Redis",
      ],
    },
    BestSeller: {
      jobTitle: "Formation DevOps & Travail d'équipe @",
      duration: "1 MOIS",
      desc: [
        "Mis en place un pipeline CI avec GitLab CI automatisant les étapes de build, test, analyse Sonar, package et publish d'un cycle de vie Maven",
        "Intégré SonarCloud pour l'analyse du code et le suivi du taux de couverture des tests",
        "Conteneurisé l'application avec Docker et instancié une machine virtuelle sur Google Cloud Platform (GCP)",
      ],
    },
    DRSPO: {
      jobTitle: "Stagiaire Développeuse Full-Stack @",
      duration: "STAGE 3ÈME ANNÉE · 1 AOÛT - 1 SEPTEMBRE",
      desc: [
        "Conçu et développé une solution web full-stack avec React et ASP.NET Core dédiée à la gestion et à la dématérialisation des courriers électroniques",
        "Facilité l'accès et le suivi des documents administratifs pour les différents départements de la Direction Régionale de la Santé",
      ],
      certificate: "StageGI3.png",
    },


    
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: "transparent", 
      display: "flex", 
      flexDirection: isMobile ? "column" : "row",
      height: "auto",
      minHeight: 300
    }}>
      <Tabs
        orientation={!isMobile ? "vertical" : "horizontal"}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{ 
          borderRight: isMobile ? 0 : 1, 
          borderBottom: isMobile ? 1 : 0,
          borderColor: "var(--lightest-navy)",
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--green-bright)"
          },
          "& .MuiTabs-flexContainer": {
            borderBottom: isMobile ? "1px solid var(--lightest-navy)" : "none"
          }
        }}
      >
        {Object.keys(experienceItems).map((key, i) => (
          <Tab 
            key={i} 
            label={key} 
            {...a11yProps(i, isMobile)} 
            sx={{
              color: "var(--slate)",
              fontFamily: "NTR",
              fontSize: "14px",
              textAlign: isMobile ? "center" : "left",
              alignItems: isMobile ? "center" : "flex-start",
              textTransform: "none",
              padding: "10px 20px",
              minHeight: "48px",
              minWidth: isMobile ? "120px" : "auto",
              "&.Mui-selected": {
                color: "var(--green-bright)"
              },
              "&:hover": {
                color: "var(--green-bright)",
                backgroundColor: "var(--green-tint)"
              }
            }}
          />
        ))}
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        {Object.keys(experienceItems).map((key, i) => (
          <TabPanel key={i} value={value} index={i} isMobile={isMobile}>
            <span className="joblist-job-title">
              {experienceItems[key]["jobTitle"] + " "}
            </span>
            <span className="joblist-job-company">{key}</span>
            <div className="joblist-duration">
              {experienceItems[key]["duration"]}
            </div>
            <div className="job-content">
              {experienceItems[key]["certificate"] && (
                <div className="job-certificate">
                  <button
                    type="button"
                    className="job-certificate-btn"
                    onClick={() =>
                      setLightbox({
                        src: asset(experienceItems[key]["certificate"]),
                        alt: "Certificat " + key,
                      })
                    }
                    aria-label={"Agrandir le certificat " + key}
                  >
                    <img
                      src={asset(experienceItems[key]["certificate"])}
                      alt={"Certificat " + key}
                    />
                    <span className="job-certificate-hint">Cliquer pour agrandir</span>
                  </button>
                </div>
              )}
              <ul className="job-description">
                {experienceItems[key]["desc"].map(function (descItem, i) {
                  return (
                    <FadeInSection key={i} delay={(i + 1) * 100 + "ms"}>
                      <li>{descItem}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
            </div>
          </TabPanel>
        ))}
      </Box>
      {lightbox &&
        createPortal(
        <div
          className="certificate-lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="certificate-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        , document.body)}
    </Box>
  );
};

export default JobList;