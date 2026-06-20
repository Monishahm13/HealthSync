import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const WellnessScore = () => {
  const [formData, setFormData] = useState({
    waterIntake: "",
    sleepHours: "",
    medicineConsistency: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateWellness = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/wellness/calculate",
        formData
      );

      setResult(res.data.wellness);
    } catch (error) {
      console.log(error);
      alert("Calculation Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Wellness Calculator</h2>

          <form
            onSubmit={calculateWellness}
            className="card p-4 mb-4"
          >

            <div className="mb-3">
              <label>Water Intake (L)</label>

              <input
                type="number"
                step="0.1"
                name="waterIntake"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Sleep Hours</label>

              <input
                type="number"
                name="sleepHours"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Medicine Consistency (%)</label>

              <input
                type="number"
                name="medicineConsistency"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success">
              Calculate Wellness
            </button>

          </form>

          {result && (
            <div className="card p-4 shadow">

              <h4>Result</h4>

              <p>
                <strong>BMI:</strong>{" "}
                {result.bmi}
              </p>

              <p>
                <strong>Wellness Score:</strong>{" "}
                {result.wellnessScore}
              </p>

              <p>
                <strong>Water Intake:</strong>{" "}
                {result.waterIntake} L
              </p>

              <p>
                <strong>Sleep Hours:</strong>{" "}
                {result.sleepHours}
              </p>

              <p>
                <strong>Medicine Consistency:</strong>{" "}
                {result.medicineConsistency}%
              </p>

            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default WellnessScore;