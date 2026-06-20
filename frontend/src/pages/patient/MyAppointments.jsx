import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get(
        "/appointments/my"
      );

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

          <h2>My Appointments</h2>

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

              {appointments.map((item) => (

                <tr key={item._id}>
                  <td>
                    {item.doctorId?.name}
                  </td>

                  <td>
                    {new Date(
                      item.appointmentDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {item.tokenNumber}
                  </td>

                  <td>
                    {item.status}
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>
    </>
  );
};

export default MyAppointments;