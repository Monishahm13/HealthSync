import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ReceptionDashboard from "./pages/receptionist/ReceptionDashboard";
import HealthProfile from "./pages/patient/HealthProfile";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Appointments from "./pages/patient/Appointments";
import MedicineTracker from "./pages/patient/MedicineTracker";
import WaterTracker from "./pages/patient/WaterTracker";
import WellnessScore from "./pages/patient/WellnessScore";
import ReportUpload from "./pages/patient/ReportUpload";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import LiveQueue from "./pages/patient/LiveQueue";
import WellnessDashboard from "./pages/patient/WellnessDashboard";
import PatientDetails from "./pages/doctor/PatientDetails";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import ReceptionBooking from "./pages/receptionist/ReceptionBooking";
import ViewProfile from "./pages/patient/ViewProfile";
import ViewRecords from "./pages/patient/ViewRecords";

import ReceptionQueue from "./pages/receptionist/ReceptionQueue";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />
        <Route
  path="/reception-booking"
  element={<ReceptionBooking />}
/>

<Route
  path="/reception-queue"
  element={<ReceptionQueue />}
/>

        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />

        <Route
  path="/view-records"
  element={<ViewRecords />}
/>

        <Route
  path="/view-profile"
  element={<ViewProfile />}
/>

        <Route
          path="/reception-dashboard"
          element={<ReceptionDashboard />}
        />
        <Route path="/health-profile" element={<HealthProfile />} />
<Route path="/medical-history" element={<MedicalHistory />} />
<Route path="/appointments" element={<Appointments />} />

<Route path="/water-tracker" element={<WaterTracker />} />
<Route
  path="/book-appointment"
  element={<BookAppointment />}
/>
<Route
  path="/my-appointments"
  element={<MyAppointments />}
/>
<Route
  path="/medicine-tracker"
  element={<MedicineTracker />}
/>

<Route
  path="/live-queue"
  element={<LiveQueue />}
/>
<Route
  path="/doctor-patients"
  element={<DoctorPatients />}
/>

<Route
  path="/doctor/patient/:id"
  element={<PatientDetails />}
/>

<Route
  path="/wellness"
  element={<WellnessDashboard />}
/>
<Route
  path="/doctor/patient/:id"
  element={<PatientDetails />}
/>


<Route path="/wellness-score" element={<WellnessScore />} />
<Route
  path="/report-upload"
  element={<ReportUpload />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;