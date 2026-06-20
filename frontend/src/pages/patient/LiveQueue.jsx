import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const LiveQueue = () => {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await api.get(
        "/appointments/queue"
      );

      setQueue(res.data);
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

          <h2>Live Queue</h2>

          <table className="table">

            <thead>
              <tr>
                <th>Doctor</th>
                <th>Token</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {queue.map((item) => (

                <tr key={item._id}>

                  <td>
                    {item.doctorId?.name}
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

export default LiveQueue;