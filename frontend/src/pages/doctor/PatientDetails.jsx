import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const PatientDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [diagnosisData, setDiagnosisData] = useState({
    symptoms: "",
    diagnosis: "",
    medicines: "",
    advice: "",
    followUpDate: "",
  });

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const res = await api.get(`/doctor/patient/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setDiagnosisData({
      ...diagnosisData,
      [e.target.name]: e.target.value,
    });
  };

  const submitDiagnosis = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/doctor/diagnosis/${id}`, {
        ...diagnosisData,
        medicines: diagnosisData.medicines
          .split(",")
          .map((m) => m.trim()),
      });

      alert("Diagnosis Added");

      setDiagnosisData({
        symptoms: "",
        diagnosis: "",
        medicines: "",
        advice: "",
        followUpDate: "",
      });

      fetchPatient();
    } catch (error) {
      console.log(error);
      alert("Failed to save diagnosis");
    }
  };

  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Patient Details</h2>

          <div className="card p-4 shadow mb-4">
            <h4>{data.patient?.userId?.name}</h4>

            <p>Phone Number: {data.patient?.phoneNumber}</p>
            <p>
  Gender:
  {" "}
  {data.patient?.gender}
</p>

<p>
  Age:
  {" "}
  {data.patient?.age}
</p>
            <p>Blood Group: {data.patient?.bloodGroup}</p>
            <p>Height: {data.patient?.height}</p>
            <p>Weight: {data.patient?.weight}</p>
            <p>Allergies: {data.patient?.allergies}</p>
          </div>

          <div className="card p-4 shadow mb-4">
            <h4>Medical History</h4>

            {data.history ? (
              <>
                <p><strong>Diseases:</strong> {data.history.diseases}</p>
                <p><strong>Surgeries:</strong> {data.history.surgeries}</p>
                <p><strong>Medications:</strong> {data.history.medications}</p>
                <p><strong>Consultations:</strong> {data.history.consultations}</p>
              </>
            ) : (
              <p>No Medical History Found</p>
            )}
          </div>

          <div className="card p-4 shadow mb-4">
            <h4>Reports</h4>

            {data.reports?.length > 0 ? (
              <ul>
                {data.reports.map((report) => (
                  <li key={report._id}>
                    {report.reportType}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Reports Uploaded</p>
            )}
          </div>

          <div className="card p-4 shadow mb-4">
            <h4>Add Diagnosis</h4>

            <form onSubmit={submitDiagnosis}>

              <input
                type="text"
                name="symptoms"
                placeholder="Symptoms"
                className="form-control mb-3"
                value={diagnosisData.symptoms}
                onChange={handleChange}
              />

              <input
                type="text"
                name="diagnosis"
                placeholder="Diagnosis"
                className="form-control mb-3"
                value={diagnosisData.diagnosis}
                onChange={handleChange}
              />

              <input
                type="text"
                name="medicines"
                placeholder="Paracetamol, Vitamin C"
                className="form-control mb-3"
                value={diagnosisData.medicines}
                onChange={handleChange}
              />

              <textarea
                name="advice"
                placeholder="Doctor Advice"
                className="form-control mb-3"
                value={diagnosisData.advice}
                onChange={handleChange}
              />

              <input
                type="date"
                name="followUpDate"
                className="form-control mb-3"
                value={diagnosisData.followUpDate}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn btn-success"
              >
                Save Diagnosis
              </button>

            </form>
          </div>

          <div className="card p-4 shadow">
            <h4>Previous Diagnoses</h4>

            {data.diagnosis?.length > 0 ? (
              data.diagnosis.map((item) => (
                <div
                  key={item._id}
                  className="border rounded p-3 mb-3"
                >
                  <p><strong>Symptoms:</strong> {item.symptoms}</p>
                  <p><strong>Diagnosis:</strong> {item.diagnosis}</p>
                  <p><strong>Medicines:</strong> {item.medicines?.join(", ")}</p>
                  <p><strong>Advice:</strong> {item.advice}</p>

                  <p>
                    <strong>Follow Up:</strong>{" "}
                    {item.followUpDate
                      ? new Date(item.followUpDate).toLocaleDateString()
                      : "Not Set"}
                  </p>
                </div>
              ))
            ) : (
              <p>No Diagnosis Records</p>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default PatientDetails;