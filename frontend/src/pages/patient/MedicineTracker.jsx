import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const MedicineTracker = () => {
  const [medicines, setMedicines] = useState([]);

  const [formData, setFormData] = useState({
    medicineName: "",
    dosage: "",
    timings: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await api.get("/medicine/my");
      setMedicines(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addMedicine = async (e) => {
    e.preventDefault();

    try {
      await api.post(
  "/medicine/add",
  {
    ...formData,
    timings: formData.timings
      .split(",")
      .map(item => item.trim())
  }
);

      alert("Medicine Added");

      setFormData({
        medicineName: "",
        dosage: "",
        timings: "",
        startDate: "",
        endDate: "",
      });

      fetchMedicines();
    } catch (error) {
      console.log(error);
    }
  };

  const markTaken = async (id) => {
    try {
      await api.put(
        `/medicine/status/${id}`,
        {
          status: "Completed",
        }
      );

      fetchMedicines();
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

          <h2>Medicine Tracker</h2>

          <form
            onSubmit={addMedicine}
            className="card p-3 mb-4"
          >
            <h4>Add Medicine</h4>

            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              className="form-control mb-2"
              value={formData.medicineName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              className="form-control mb-2"
              value={formData.dosage}
              onChange={handleChange}
            />

            <input
              type="text"
              name="timings"
              placeholder="Morning / Night"
              className="form-control mb-2"
              value={formData.timings}
              onChange={handleChange}
            />

            <input
              type="date"
              name="startDate"
              className="form-control mb-2"
              value={formData.startDate}
              onChange={handleChange}
            />

            <input
              type="date"
              name="endDate"
              className="form-control mb-2"
              value={formData.endDate}
              onChange={handleChange}
            />

            <button className="btn btn-success">
              Add Medicine
            </button>
          </form>

          <div className="card p-3">
            <h4>My Medicines</h4>

            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dosage</th>
                  <th>Timing</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {medicines.map((item) => (
                  <tr key={item._id}>
                    <td>{item.medicineName}</td>
                    <td>{item.dosage}</td>
                    <td>
  {item.timings?.join(", ")}
</td>
                    <td>{item.status}</td>

                    <td>
                      <button
  className="btn btn-success btn-sm"
  onClick={() => markTaken(item._id)}
>
  Complete
</button>
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

export default MedicineTracker;