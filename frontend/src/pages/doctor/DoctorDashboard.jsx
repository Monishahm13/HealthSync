import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const DoctorDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Doctor Dashboard</h2>

          <div className="row">

            <div className="col-md-4">
              <div className="card p-4 shadow">

                <h4>Patients</h4>

                <Link
                  to="/doctor-patients"
                  className="btn btn-primary"
                >
                  View Patients
                </Link>

              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;