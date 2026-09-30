import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import AIChatPage from "./pages/AIChatPage";
import NearbyHelp from "./pages/NearbyHelp";
import Hospitals from "./pages/Hospitals";
import History from "./pages/History";
import Profile from "./pages/Profile";
import EmergencyContacts from "./pages/EmergencyContacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-container">
          <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />


            {/* =========================
                HOME ROUTE
                Logged out → Login
                Logged in → Home
            ========================= */}

            <Route
              path="/"
              element={
                user ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />


            {/* =========================
                PROTECTED ROUTES
            ========================= */}

            <Route element={<ProtectedRoute />}>

              <Route
                path="/emergency"
                element={<Emergency />}
              />

              <Route
                path="/ai"
                element={<AIChatPage />}
              />

              <Route
                path="/nearby"
                element={<NearbyHelp />}
              />

              <Route
                path="/hospitals"
                element={<Hospitals />}
              />

              <Route
                path="/history"
                element={<History />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/contacts"
                element={<EmergencyContacts />}
              />

            </Route>


            {/* =========================
                UNKNOWN ROUTES
            ========================= */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
