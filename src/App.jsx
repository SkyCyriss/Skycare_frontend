import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* ----------- Patient ----------- */
import Patientform from "./components/Patient/Registration";

/* ----------- Dashboard ----------- */
import LiveConsultationQueue from "./components/dashboards/LiveConsultationQueue";
import TreatmentPlan from "./components/dashboards/treatment/TreatmentPlan";
import DashboardLayout from "./components/dashboards/DashboardLayout/DashboardLayout";
import ProtectedRoute from "./components/dashboards/DashboardLayout/ProtectedRoute";
import PatientProfile from "./components/dashboards/PatientProfile/PatientProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= DEFAULT (Registration) ================= */}
        <Route index element={<Patientform />} />

        {/* ================= DASHBOARD (Protected) ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="live-queue"
            element={<LiveConsultationQueue />}
          />

          <Route
            path="treatment-plan"
            element={<TreatmentPlan />}
          />

          <Route path="patient-360" element={<PatientProfile />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
