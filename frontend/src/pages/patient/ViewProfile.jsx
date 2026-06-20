import { useEffect, useState } from "react";
import api from "../../api/axios";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const res = await api.get("/patient/profile");

    setProfile(res.data.patient);

  } catch (error) {
    console.log(error);
  }
};

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="container p-4">
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <div className="container p-4">

          <h2>My Health Profile</h2>

          <div className="card shadow p-4">

            <p><strong>Age:</strong> {profile.age}</p>

            <p><strong>Gender:</strong> {profile.gender}</p>

            <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>

            <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>

            <p><strong>Height:</strong> {profile.height} cm</p>

            <p><strong>Weight:</strong> {profile.weight} kg</p>

            <p><strong>Allergies:</strong> {profile.allergies}</p>

            <p><strong>Smoking:</strong> {profile.smokingHabits}</p>

            <p><strong>Alcohol:</strong> {profile.alcoholHabits}</p>

          </div>

        </div>
      </div>
    </>
  );
};

export default ViewProfile;