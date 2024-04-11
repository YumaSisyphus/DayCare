import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import DashboardParents from "./pages/Parents/DashboardParents";
import Activity from "./pages/Activities/ActivityDashboard";
import ParentForm from "./pages/Parents/ParentForm";
import Food from "./pages/Food/FoodDashboard";
import EditParent from "./pages/Parents/EditParents";
import Header from "../src/components/Header";
import ChildParent from "./pages/Parents/ChildParent";
import DashboardChildren from "./pages/Children/DashboardChildren";
import ClassDashboard from "./pages/Class/ClassDashboard";
import AboutUs from "./pages/AboutUs";
import AgeGroupDashboard from "./pages/AgeGroup/AgeGroupDashboard";
import ChildForm from "./pages/Children/ChildForm";
import EditChild from "./pages/Children/EditChild";
import Meal from "./pages/Meal/MealDashboard";
import Staff from "./pages/Staff/StaffDashboard";
import ContactForm from "./pages/ContactForm/ContactDashboard";

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
        <Route path="/EditParents/:parentId" element={<EditParent />} />
        <Route path="/ChildParent" element={<ChildParent />} />     
        <Route path="/foodDashboard" element={<Food />} />
        <Route path="/ClassDashboard" element={<ClassDashboard />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AgeGroupDashboard" element={<AgeGroupDashboard />} />
        <Route path="/AddChild" element={<ChildForm />} />
        <Route path="/EditChild/:childId" element={<EditChild />} />
        <Route path="/staffDashboard" element={<Staff />} />
        <Route path="/ContactDashboard" element={<ContactForm />} />
        <Route path="/mealDashboard" element={<Meal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
