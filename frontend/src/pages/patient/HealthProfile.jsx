import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const HealthProfile = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: "",
    smokingHabits: "",
    alcoholHabits: "",
    phoneNumber: "",
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
      await api.post("/patient/profile", formData);

      alert("Profile Saved Successfully");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed To Save Profile"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Patient Health Profile</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="number"
              name="age"
              placeholder="Age"
              className="form-control mb-3"
              onChange={handleChange}
            />

            <select
  name="gender"
  className="form-control mb-3"
  onChange={handleChange}
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>

<input
  type="text"
  name="phoneNumber"
  placeholder="Phone Number"
  className="form-control mb-3"
  onChange={handleChange}
/>

            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              className="form-control mb-3"
              onChange={handleChange}
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              className="form-control mb-3"
              onChange={handleChange}
            />

            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              className="form-control mb-3"
              onChange={handleChange}
            />

            <input
              type="text"
              name="allergies"
              placeholder="Allergies"
              className="form-control mb-3"
              onChange={handleChange}
            />

            

            <select
  name="smokingHabits"
  className="form-control mb-3"
  onChange={handleChange}
>
  <option value="">Smoking</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

            <select
  name="alcoholHabits"
  className="form-control mb-3"
  onChange={handleChange}
>
  <option value="">Alcohol</option>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</select>

            

            
            <button
              type="submit"
              className="btn btn-success"
            >
              Save Profile
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default HealthProfile;