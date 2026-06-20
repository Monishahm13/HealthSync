import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const MedicalHistory = () => {
  const [formData, setFormData] = useState({
    diseases: "",
    surgeries: "",
    medications: "",
    consultations: "",
    allergiesHistory: "",
    familyHistory: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/medical-history",
        formData
      );

      alert("Medical History Saved");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Save Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Medical History</h2>

          <form onSubmit={handleSubmit}>

            <textarea
              className="form-control mb-3"
              placeholder="Diseases"
              name="diseases"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Surgeries"
              name="surgeries"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Medications"
              name="medications"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Consultations"
              name="consultations"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Allergy History"
              name="allergiesHistory"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Family History"
              name="familyHistory"
              onChange={handleChange}
            />

            <textarea
              className="form-control mb-3"
              placeholder="Notes"
              name="notes"
              onChange={handleChange}
            />

            <button
              className="btn btn-primary"
              type="submit"
            >
              Save Medical History
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default MedicalHistory;