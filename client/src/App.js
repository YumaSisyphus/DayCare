import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import DashboardParents from "./pages/Parents/DashboardParents";
import DashboardChildren from "./pages/dashboardChildren";
import Activity from "./pages/Activities/ActivityDashboard";
import ParentForm from "./pages/Parents/ParentForm";
import Food from "./pages/Food/FoodDashboard";
import Header from "../src/components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DashboardParents" element={<DashboardParents />} />
        <Route path="/DashboardChildren" element={<DashboardChildren />} />
        <Route path="/activities" element={<Activity />} />
        <Route path="/ParentForm" element={<ParentForm />} />
        <Route path="/foodDashboard" element={<Food />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
