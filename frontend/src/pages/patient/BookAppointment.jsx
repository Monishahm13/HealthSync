import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
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
      const res = await api.post(
        "/appointments/book",
        formData
      );

      alert(
        `Appointment Booked!\nToken Number: ${Date.now()}`
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Booking Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Book Appointment</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Doctor ID</label>

              <input
                type="text"
                name="doctorId"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Appointment Date</label>

              <input
                type="date"
                name="appointmentDate"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              Book Appointment
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default BookAppointment;