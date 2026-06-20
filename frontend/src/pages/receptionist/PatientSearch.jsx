import { useEffect, useState } from "react";
import api from "../../api/axios";

const PatientSearch = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const res = await api.get("/doctor/patients");
    setPatients(res.data);
  };

  const filtered = patients.filter((p) =>
    p.userId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="card p-4 shadow">

      <h4>Patient Search</h4>

      <input
        className="form-control mb-3"
        placeholder="Search patient..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filtered.map((patient) => (
        <div
          key={patient._id}
          className="border p-2 mb-2"
        >
          {patient.userId?.name}
        </div>
      ))}
    </div>
  );
};

export default PatientSearch;