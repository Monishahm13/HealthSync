import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await api.post("/auth/login", formData);
      console.log(res.data);
      console.log("ROLE =", res.data.role);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "patient") {
        navigate("/patient-dashboard");
      }

      if (res.data.role === "doctor") {
        navigate("/doctor-dashboard");
      }

      if (res.data.role === "receptionist") {
        navigate("/reception-dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              HealthSync Login
            </h2>

            <form onSubmit={handleSubmit}>

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

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <p className="mt-3 text-center">
              New User?
              <Link to="/register">
                {" "}Register Here
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;