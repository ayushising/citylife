import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { CustomerDashboard } from "./components/CustomerDashboard";
import { ServiceProviderDashboard } from "./components/ServiceProviderDashboard";
import { StaffDashboard } from "./components/StaffDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { AboutPage } from "./components/AboutPage";
import { CareersPage } from "./components/CareersPage";
import { Toaster } from "./components/ui/sonner";

type Page = "landing" | "auth" | "dashboard" | "about" | "careers";
type UserRole =
  | "customer"
  | "provider"
  | "staff"
  | "admin"
  | null;

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<Page>("landing");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleGetStarted = () => {
    setCurrentPage("auth");
  };

  const handleLogin = (email: string, role: UserRole) => {
    setUserEmail(email);
    setUserRole(role);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setUserEmail("");
    setUserRole(null);
    setCurrentPage("landing");
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  return (
    <>
      {currentPage === "landing" && (
        <LandingPage
          onGetStarted={handleGetStarted}
          onLogin={() => setCurrentPage("auth")}
          onNavigateToAbout={() => setCurrentPage("about")}
          onNavigateToCareers={() => setCurrentPage("careers")}
        />
      )}

      {currentPage === "auth" && (
        <AuthPage
          onLogin={handleLogin}
          onBack={handleBackToHome}
        />
      )}

      {currentPage === "about" && (
        <AboutPage onBack={handleBackToHome} />
      )}

      {currentPage === "careers" && (
        <CareersPage onBack={handleBackToHome} />
      )}

      {currentPage === "dashboard" &&
        userRole === "customer" && (
          <CustomerDashboard
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        )}

      {currentPage === "dashboard" &&
        userRole === "provider" && (
          <ServiceProviderDashboard
            userEmail={userEmail}
            onLogout={handleLogout}
          />
        )}

      {currentPage === "dashboard" && userRole === "staff" && (
        <StaffDashboard
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      )}

      {currentPage === "dashboard" && userRole === "admin" && (
        <AdminDashboard
          userEmail={userEmail}
          onLogout={handleLogout}
        />
      )}

      <Toaster />
    </>
  );
}