import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/doctor/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">
          <h2>Patients</h2>

          <div className="card shadow p-3">
            <table className="table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td>{patient.userId?.name}</td>
                    <td>{patient.userId?.phoneNumber}</td>

                    <td>
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/doctor/patient/${patient._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorPatients;