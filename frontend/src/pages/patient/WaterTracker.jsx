import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const WaterTracker = () => {
  const [water, setWater] = useState(0);

  const addGlass = () => {
    setWater(water + 0.25);
  };

  const resetWater = () => {
    setWater(0);
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">
          <h2>Water Intake Tracker</h2>

          <div className="card shadow p-4">

            <h4>
              Today's Water Intake
            </h4>

            <h1>{water.toFixed(2)} L</h1>

            <div className="mt-3">

              <button
                className="btn btn-primary me-2"
                onClick={addGlass}
              >
                + Add Glass (250ml)
              </button>

              <button
                className="btn btn-danger"
                onClick={resetWater}
              >
                Reset
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default WaterTracker;