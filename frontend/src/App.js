import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/authContext";
import Navbar from "./components/navbar";
import Home from "./components/home";
import SignupComponent from "./components/SignUp";
import SigninComponent from "./components/SignIn";
import LogoutComponent from "./components/LogOut";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SigninComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />{" "}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
