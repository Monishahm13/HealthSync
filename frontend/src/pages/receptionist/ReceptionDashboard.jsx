import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";

const ReceptionDashboard = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    availableDoctors: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res =
        await api.get(
          "/receptionist/dashboard"
        );

      setStats(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2>Reception Dashboard</h2>
            <p className="text-muted">
              Manage Patients & Appointments
            </p>
          </div>

        </div>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Total Patients</h5>
                <h2>
                  {stats.totalPatients}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Today's Appointments</h5>
                <h2>
                  {stats.todayAppointments}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Pending Queue</h5>
                <h2>
                  {stats.pendingAppointments}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow">
              <div className="card-body text-center">
                <h5>Doctors</h5>
                <h2>
                  {stats.availableDoctors}
                </h2>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4">

          <h4>Quick Actions


          </h4>

          <div className="row">

            <div className="col-md-4 mb-3">

              <button
                className="btn btn-primary w-100"
                onClick={() =>
                  navigate(
                    "/reception-booking"
                  )
                }
              >
                Book Appointment
              </button>

            </div>

            <div className="col-md-4 mb-3">

              <button
                className="btn btn-success w-100"
                onClick={() =>
                  navigate(
                    "/reception-queue"
                  )
                }
              >
                Manage Queue
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default ReceptionDashboard;