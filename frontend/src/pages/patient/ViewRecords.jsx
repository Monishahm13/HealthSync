import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ViewRecords = () => {
  const [reports, setReports] = useState([]);
  const [diagnosis, setDiagnosis] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/patient/records");

      setReports(res.data.reports || []);
      setDiagnosis(res.data.diagnosis || []);
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

          <h2 className="mb-4">Medical Records</h2>

          {/* Uploaded Reports */}

          <div className="card shadow p-4 mb-4">

            <h4>Uploaded Reports</h4>

            {reports.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Report Type</th>
                    <th>File Name</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((report) => (
                    <tr key={report._id}>
                      <td>{report.reportType}</td>
                      <td>{report.fileName}</td>
                      <td>
                        {new Date(
                          report.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <p>No Reports Found</p>
            )}

          </div>

          {/* Doctor Diagnoses */}

          <div className="card shadow p-4">

            <h4>Doctor Diagnoses</h4>

            {diagnosis.length > 0 ? (

              diagnosis.map((item) => (
                <div
                  key={item._id}
                  className="border rounded p-3 mb-3"
                >

                  <p>
                    <strong>Symptoms:</strong>{" "}
                    {item.symptoms}
                  </p>

                  <p>
                    <strong>Diagnosis:</strong>{" "}
                    {item.diagnosis}
                  </p>

                  <p>
                    <strong>Medicines:</strong>{" "}
                    {item.medicines?.join(", ")}
                  </p>

                  <p>
                    <strong>Advice:</strong>{" "}
                    {item.advice}
                  </p>

                  <p>
                    <strong>Follow Up:</strong>{" "}
                    {item.followUpDate
                      ? new Date(
                          item.followUpDate
                        ).toLocaleDateString()
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

export default ViewRecords;