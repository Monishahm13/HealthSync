import { useEffect, useState } from "react";
import api from "../../api/axios";

const DoctorAvailability = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const res = await api.get(
      "/doctor/all-doctors"
    );

    setDoctors(res.data);
  };

  return (
    <div className="card p-4 shadow">

      <h4>Doctors Available</h4>

      <table className="table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>

          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
};

export default DoctorAvailability;