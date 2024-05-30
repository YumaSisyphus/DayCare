import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js"; // Import Elements
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe

import WelcomeScreen from "../src/pages/WelcomeScreen";
import Login from "./pages/Login";
import DashboardParents from "./pages/Parents/DashboardParents";
import Activity from "./pages/Activities/ActivityDashboard";
import ParentForm from "./pages/Parents/ParentForm";
import Food from "./pages/Food/FoodDashboard";
import EditParent from "./pages/Parents/EditParents";
import Header from "../src/components/Header";
import PrivateRoute from "./utils/privateRoute";
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
import ReportForm from "./pages/Report/ReportForm";
import ContactUs from "./pages/ContactUs";
import { AuthProvider } from "./utils/authContext";
import RoleBasedRoute from "./utils/roleBasedRoute";
import AuthRoute from "./utils/authRoute";
import TeacherHome from "./pages/TeacherPages/TeacherHome";
import AdminHome from "./pages/AdminPages/AdminHome";
import ParentHome from "./pages/Parents/ParentHome";
import ChildHome from "./pages/Children/ChildHome";
import PaymentForm from "./pages/Parents/PaymentForm";
import SuccessPage from "./pages/Parents/SuccessPage";
import CreatePaymentForm from "./pages/Payment/CreatePaymentForm";
import InvoiceDashboard from "./pages/Payment/InvoiceDashboard";
import MyClasses from "./pages/TeacherPages/MyClasses";
import { Class } from "@mui/icons-material";
import Chat from "./pages/Chat/chat";
import SingleClass from "./pages/Class/IndividualClass";
import MyChildren from "./pages/Parents/MyChildren";

const stripePromise = loadStripe(
  "pk_test_51PKjl62MB0mC2oqNWZNkOj7IeAiL6wEnwh7WBi0qA3mOOgAuKEvCXk3VcSmieNR8MYSvgxZ3yotDnGk6BPOdZ4uG00u5ewr2Ck"
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/DashboardParents"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Admin"]}
              >
                <DashboardParents />
              </RoleBasedRoute>
            }
          />

          <Route
            path="/TeacherHome"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Teacher"]}
              >
                <TeacherHome />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/MyClasses"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Teacher"]}
              >
                <MyClasses />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/MyChildren"
            element={
              <RoleBasedRoute
                allowedRoles={["parent"]}
                allowedSpecificRoles={["parent"]}
              >
                <MyChildren />
              </RoleBasedRoute>
            }
          />
          <Route path="/chat" element={<Chat />} />
          <Route path="/DashboardChildren" element={<DashboardChildren />} />
          <Route path="/ChildHome/:id" element={<ChildHome />} />
          <Route path="/activities" element={<Activity />} />
          <Route path="/SuccessPage" element={<SuccessPage />} />
          <Route path="/ParentForm" element={<ParentForm />} />
          <Route path="/CreatePaymentForm" element={<CreatePaymentForm />} />
          <Route path="/EditParents/:parentId" element={<EditParent />} />
          <Route path="/ChildParent" element={<ChildParent />} />
          <Route path="/foodDashboard" element={<Food />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/InvoiceDashboard" element={<InvoiceDashboard />} />
          <Route path="/classes/:id" element={<SingleClass />} />

          <Route
            path="/PaymentForm"
            element={
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            }
          />
          <Route
            path="/AgeGroupDashboard"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Admin"]}
              >
                <AgeGroupDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/CreatePaymentForm"
            element={
              <RoleBasedRoute
                allowedSpecificRoles={["parent"]}
                allowedRoles={["parent"]}
              >
                <CreatePaymentForm />
              </RoleBasedRoute>
            }
          />
     
         
          <Route
            path="/AdminHome"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Admin"]}
              >
                <AdminHome />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/ParentHome"
            element={
              <RoleBasedRoute
                allowedSpecificRoles={["parent"]}
                allowedRoles={["parent"]}
              >
                <ParentHome />
              </RoleBasedRoute>
            }
          />
          <Route path="/ChildHome" element={<ChildHome />} />
          <Route path="/AddChild" element={<ChildForm />} />
          <Route path="/EditChild/:childId" element={<EditChild />} />
          <Route
            path="/StaffDashboard"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Admin"]}
              >
                <Staff />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/ClassDashboard"
            element={
              <RoleBasedRoute
                allowedRoles={["staff"]}
                allowedSpecificRoles={["Admin"]}
              >
                <ClassDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/ContactDashboard"
            element={
              <PrivateRoute>
                <ContactForm />
              </PrivateRoute>
            }
          />
          <Route path="/mealDashboard" element={<Meal />} />
          <Route path="/ReportForm/:childId" element={<ReportForm />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
