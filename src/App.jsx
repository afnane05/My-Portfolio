import React from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <NavBar />
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