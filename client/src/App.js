import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardChildren from "./pages/dashboardChildren";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/DashboardChildren" element={<DashboardChildren />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
