import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import DashboardChildren from "./pages/Children/DashboardChildren";
import ChildForm from "./pages/Children/ChildForm";
import EditChild from "./pages/Children/EditChild";
import Activity from "./pages/Activities/ActivityDashboard";
import DashboardParents from "./pages/Parents/DashboardParents";
import ParentForm from "./pages/Parents/ParentForm";
import EditParent from "./pages/Parents/EditParents";
import Food from "./pages/Food/FoodDashboard";
import Header from "../src/components/Header";
import AboutUs from "./pages/AboutUs";
import ClassDashboard from "./pages/Class/ClassDashboard";
import AgeGroupDashboard from "./pages/AgeGroup/AgeGroupDashboard";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/DashboardChildren" element={<DashboardChildren />} />
        <Route path="/EditChild/:childId" element={<EditChild />} />
        <Route path="/ChildForm" element={<ChildForm />} />
        <Route path="/activities" element={<Activity />} />
        <Route path="/DashboardParents" element={<DashboardParents />} />
        <Route path="/ParentForm" element={<ParentForm />} />
        <Route path="/EditParents/:parentId" element={<EditParent />} />
        <Route path="/foodDashboard" element={<Food />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ClassDashboard" element={<ClassDashboard />} />
        <Route path="/AgeGroupDashboard" element={<AgeGroupDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
