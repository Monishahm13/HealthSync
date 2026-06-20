import { useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ReportUpload = () => {
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("reportType", reportType);
    formData.append("report", file);

    try {
      await api.post(
        "/reports/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Report Uploaded Successfully");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>Upload Medical Report</h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Report Type</label>

              <input
                type="text"
                className="form-control"
                placeholder="Blood Test / Prescription / Scan"
                value={reportType}
                onChange={(e) =>
                  setReportType(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label>Select File</label>

              <input
                type="file"
                className="form-control"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />
            </div>

            <button
              className="btn btn-success"
              type="submit"
            >
              Upload Report
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default ReportUpload;