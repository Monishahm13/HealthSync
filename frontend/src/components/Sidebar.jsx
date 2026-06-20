import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">HealthSync</h3>

      <ul className="list-unstyled">

        <li className="mb-3">
          <Link
            to="/patient-dashboard"
            className="text-white text-decoration-none"
          >
            Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/health-profile"
            className="text-white text-decoration-none"
          >
            Health Profile
          </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/medical-history"
            className="text-white text-decoration-none"
          >
            Medical History
          </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/appointments"
            className="text-white text-decoration-none"
          >
            Appointments
          </Link>
        </li>

        <li className="mb-3">
          <Link
            to="/medicine-tracker"
            className="text-white text-decoration-none"
          >
            Medicine Tracker
          </Link>
        </li>

        

        

        <li className="mb-3">
  <Link
    to="/report-upload"
    className="text-white text-decoration-none"
  >
    Upload Reports
  </Link>
</li>

<li className="mb-3">
  <Link
    to="/book-appointment"
    className="text-white text-decoration-none"
  >
    Book Appointment
  </Link>
</li>


<li className="mb-3">
  <Link
    to="/my-appointments"
    className="text-white text-decoration-none"
  >
    My Appointments
  </Link>
</li>

<li className="mb-3">
  <Link
    to="/view-profile"
    className="text-white text-decoration-none"
  >
    View Profile
  </Link>
</li>
<li className="mb-3">
  <Link
    to="/view-records"
    className="text-white text-decoration-none"
  >
    View Records
  </Link>
</li>



      </ul>
    </div>
  );
};

export default Sidebar;