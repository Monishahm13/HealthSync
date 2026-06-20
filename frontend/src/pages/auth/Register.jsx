import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
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
      await api.post("/auth/signup", formData);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              HealthSync Registration
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={handleChange}
              />

              <select
                name="role"
                className="form-control mb-3"
                onChange={handleChange}
              >
                <option value="patient">
                  Patient
                </option>

                <option value="doctor">
                  Doctor
                </option>

                <option value="receptionist">
                  Receptionist
                </option>

              </select>

              <button
                className="btn btn-success w-100"
              >
                Register
              </button>

            </form>

            <p className="mt-3 text-center">
              Already have an account?
              <Link to="/">
                {" "}Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;