import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ReceptionBooking = () => {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: ""
  });

  useEffect(() => {
    loadPatients();
    loadDoctors();
  }, []);

  const loadPatients = async () => {
    try {

      const res =
        await api.get(
          "/receptionist/patients"
        );

      setPatients(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const loadDoctors = async () => {
    try {

      const res =
        await api.get(
          "/doctor/all-doctors"
        );

      setDoctors(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/receptionist/book-appointment",
          formData
        );

      alert(
        `Appointment Booked Successfully. Token Number: ${res.data.appointment.tokenNumber}`
      );

      setFormData({
        patientId: "",
        doctorId: "",
        appointmentDate: ""
      });

    } catch (error) {

      console.log(error);

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

          <h2>
            Reception Appointment Booking
          </h2>

          <div className="card shadow p-4">

            <form onSubmit={handleSubmit}>

              <label className="mb-2">
                Select Patient
              </label>

              <select
                className="form-control mb-3"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Patient
                </option>

                {patients.map((patient) => (
                  <option
                    key={patient._id}
                    value={patient._id}
                  >
                    {patient.userId?.name}
                  </option>
                ))}
              </select>

              <label className="mb-2">
                Select Doctor
              </label>

              <select
                className="form-control mb-3"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor._id}
                    value={doctor._id}
                  >
                    {doctor.name}
                  </option>
                ))}
              </select>

              <label className="mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                className="form-control mb-3"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary"
              >
                Book Appointment
              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
};

export default ReceptionBooking;