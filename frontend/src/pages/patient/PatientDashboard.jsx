import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import api from "../../api/axios";
import { Link } from "react-router-dom";
const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {

      const appointmentRes =
        await api.get("/appointments/my");

      setAppointments(appointmentRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const upcomingAppointment =
    appointments.length > 0
      ? appointments[0]
      : null;

  return (
    <>
      <Navbar />

      <h2 className="mb-4">
  Patient Dashboard
</h2>

<div className="row">

  <div className="col-md-4 mb-4">
    <div className="card shadow p-4 text-center">
      <h4>View Profile</h4>

      <a
        href="/view-profile"
        className="btn btn-primary mt-3"
      >
        Open
      </a>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card shadow p-4 text-center">
      <h4>Medicine Tracker</h4>

      <a
        href="/medicine-tracker"
        className="btn btn-success mt-3"
      >
        Open
      </a>
    </div>
  </div>

  <div className="col-md-4 mb-4">
    <div className="card shadow p-4 text-center">
      <h4>View Records</h4>

      <a
        href="/view-records"
        className="btn btn-info mt-3"
      >
        Open
      </a>
    </div>
  </div>

</div>

<div className="row">

  <div className="col-md-12 mb-4">
    <div className="card shadow p-4">

      <h4>Upcoming Appointment</h4>

      {upcomingAppointment ? (
        <>
          <p>
            <strong>Doctor:</strong>{" "}
            {upcomingAppointment.doctorId?.name}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(
              upcomingAppointment.appointmentDate
            ).toLocaleDateString()}
          </p>

          <p>
            <strong>Token:</strong>{" "}
            {upcomingAppointment.tokenNumber}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {upcomingAppointment.status}
          </p>
        </>
      ) : (
        <p>No Appointments Found</p>
      )}

    </div>
  </div>

</div>
    </>
  );
};


export default PatientDashboard;