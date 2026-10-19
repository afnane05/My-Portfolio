import React, { useState } from "react";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import Apropos from "./components/Apropos";
import Projects from "./components/Projects";
import Hackathon from "./components/Hackathon";
import NavBar from "./components/NavBar";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import "./styles/Global.css";


function App() {
  const { pathname } = useLocation();
  const [gameActive, setGameActive] = useState(false);
  const [showGameInfo, setShowGameInfo] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />
      <div className="game-toggle-fixed">

        <div className="game-toggle-row">
          <button
            className={`game-toggle-btn${gameActive ? " game-toggle-btn--on" : ""}`}
            onClick={() => setGameActive((a) => !a)}
            title={gameActive ? "Disable game mode" : "Enable game mode"}
          >
            <span className="game-toggle-dot" />
            game mode
          </button>
          {gameActive && (
            <button
              className="game-info-btn"
              onMouseEnter={() => setShowGameInfo(true)}
              onMouseLeave={() => setShowGameInfo(false)}
            >
              i
            </button>
          )}
        </div>
      </div>
      <div id="content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Intro />
                <Apropos />
                <Experience />
                <Projects />
                <Hackathon />
              </>
            }
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;
