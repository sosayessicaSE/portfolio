import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/authContext";
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignupComponent from "./components/SignUp";
import SigninComponent from "./components/SignIn";
import LogoutComponent from "./components/LogOut";
import Library from "./components/library";
import Projects from "./components/projects";
import AboutMe from "./components/aboutme";
import Contacts from "./components/contacts";

function App() {
  return (
    <Router basename="/Portfoliohosted">
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SigninComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="/library" element={<Library />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/contact" element={<Contacts />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
