import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import DashboardParents from "./pages/DashboardParents";
import DashboardChildren from "./pages/dashboardChildren";
import Activity from "./pages/Activities/ActivityDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DashboardParents" element={<DashboardParents />} />
        <Route path="/DashboardChildren" element={<DashboardChildren />} />
        <Route path="/activities" element={<Activity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
