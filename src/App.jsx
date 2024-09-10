import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login2 from "./login2";
import Merchant from "./merchant"; 
import Regis from "./regris"; 
import "./index.css";
import Tailwind from "./tailwind";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route path="/merchant" element={<Merchant />} />
        <Route path="/regis" element={<Regis />} />
        <Route path="/tailwind" element={<Tailwind />} />
      </Routes>
    </Router>
  );
};

export default App;
