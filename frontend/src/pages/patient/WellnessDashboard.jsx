import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const WellnessDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWellness();
  }, []);

  const fetchWellness = async () => {
    try {
      const res = await api.get("/wellness/my");

      if (res.data.length > 0) {
        setData(res.data[res.data.length - 1]);
      }
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
          <h2>Wellness Dashboard</h2>

          {!data ? (
            <p>No wellness data available</p>
          ) : (
            <div className="row">

              <div className="col-md-3 mb-3">
                <div className="card p-3 shadow">
                  <h5>BMI</h5>
                  <h3>{data.bmi}</h3>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card p-3 shadow">
                  <h5>Wellness Score</h5>
                  <h3>{data.wellnessScore}</h3>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card p-3 shadow">
                  <h5>Water Intake</h5>
                  <h3>{data.waterIntake} L</h3>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card p-3 shadow">
                  <h5>Sleep Hours</h5>
                  <h3>{data.sleepHours}</h3>
                </div>
              </div>

              <div className="col-md-3 mb-3">
                <div className="card p-3 shadow">
                  <h5>Medicine Consistency</h5>
                  <h3>{data.medicineConsistency}%</h3>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WellnessDashboard;