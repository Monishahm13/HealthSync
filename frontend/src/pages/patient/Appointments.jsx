import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");
      setAppointments(res.data);
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

          <h2>Appointments</h2>

          <div className="card shadow p-4">

            {appointments.length === 0 ? (
              <p>No appointments found.</p>
            ) : (
              <table className="table">

                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Token</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {appointments.map((appointment) => (

                    <tr key={appointment._id}>

                      <td>
                        {appointment.doctorId?.name}
                      </td>

                      <td>
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {appointment.tokenNumber}
                      </td>

                      <td>
                        {appointment.status}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Appointments;