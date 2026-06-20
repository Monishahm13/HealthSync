import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ReceptionQueue = () => {

  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {

    try {

      const res =
        await api.get(
          "/receptionist/queue"
        );

      setQueue(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await api.put(
        `/appointments/status/${id}`,
        { status }
      );

      fetchQueue();

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

          <h2>Reception Queue Management</h2>

          <div className="card shadow p-4">

            <table className="table table-bordered">

              <thead>

                <tr>

                  <th>Token</th>

                  <th>Patient</th>

                  <th>Doctor</th>

                  <th>Date</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {queue.length > 0 ? (

                  queue.map((item) => (

                    <tr key={item._id}>

                      <td>
                        {item.tokenNumber}
                      </td>

                      <td>
                        {item.patientId?.userId?.name ||
                          "Patient Removed"}
                      </td>

                      <td>
                        {item.doctorId?.name}
                      </td>

                      <td>
                        {new Date(
                          item.appointmentDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {item.status}
                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "Waiting"
                            )
                          }
                        >
                          Waiting
                        </button>

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "In Consultation"
                            )
                          }
                        >
                          Start
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "Completed"
                            )
                          }
                        >
                          Complete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No Queue Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
};

export default ReceptionQueue;