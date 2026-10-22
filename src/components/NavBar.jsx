import React, { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../styles/NavBar.css";
import { SiLeetcode } from "react-icons/si";

// Ids each link may point to (matched case-insensitively), so a link works
// whatever capitalisation the section's id uses.
const SECTIONS = {
  Apropos: ["apropos", "about"],
  Experience: ["experience"],
  Logiciels: ["logiciels", "projects"],
  Hackathon: ["hackathon"],
};

const findSection = (names) => {
  for (const name of names) {
    const el = document.querySelector(`[id="${name}" i]`);
    if (el) return el;
  }
  return null;
};

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollPos = useRef(0);

  // Close the mobile menu first, then scroll (the menu closing restores the
  // old scroll position, so we wait a moment before scrolling).
  const go = (key) => (e) => {
    e.preventDefault();
    setExpanded(false);
    setTimeout(() => {
      const el = SECTIONS[key] ? findSection(SECTIONS[key]) : null;
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

  useEffect(() => {
    if (expanded) {
      scrollPos.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPos.current}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [expanded]);

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="navbar"
      data-bs-theme="dark"
      expanded={expanded}
      onToggle={(isExpanded) => setExpanded(isExpanded)}
    >
      <Container>
        <Navbar.Brand href="#Accueil" onClick={go("Accueil")}>Afnane Lamriss</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href="#Accueil" onClick={go("Accueil")}>Accueil</Nav.Link>
            <Nav.Link href="#Apropos" onClick={go("Apropos")}>À propos</Nav.Link>
            <Nav.Link href="#Experience" onClick={go("Experience")}>Experience</Nav.Link>
            <Nav.Link href="#Logiciels" onClick={go("Logiciels")}>Logiciels</Nav.Link>
            <Nav.Link href="#Hackathon" onClick={go("Hackathon")}>Hackathon</Nav.Link>
          </Nav>
          <Nav className="ms-auto" onSelect={() => setExpanded(false)}>
            <Nav.Link href="mailto:afnanelamriss475@gmail.com">
              <EmailRoundedIcon style={{ fontSize: 20 }} />
            </Nav.Link>
            <Nav.Link href="https://github.com/afnane05" target="_blank">
              <GitHubIcon style={{ fontSize: 19 }} />
            </Nav.Link>
            <Nav.Link
              href="https://leetcode.com/u/afnane05/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiLeetcode style={{ fontSize: 18 }} />
            </Nav.Link>
            <Nav.Link
              href="https://www.linkedin.com/in/lamriss-afnane-644543336/"
              target="_blank"
            >
              <LinkedInIcon style={{ fontSize: 21 }} />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;