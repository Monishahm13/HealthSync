const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const medicalHistoryRoutes =
require("./routes/medicalHistoryRoutes");
const reportRoutes =
require("./routes/reportRoutes");
const doctorRoutes =
require("./routes/doctorRoutes");
const appointmentRoutes =
require("./routes/appointmentRoutes");
const receptionistRoutes =
require("./routes/receptionistRoutes");
const wellnessRoutes =
require("./routes/wellnessRoutes");
const medicineRoutes =
require("./routes/medicineRoutes");
const errorHandler = require("./middleware/errorMiddleware");





console.log("Patient Routes Loaded");




dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const connectDB = require("./config/db");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/patient",patientRoutes);
app.use(
"/api/medical-history",
medicalHistoryRoutes
);
app.use(
"/api/reports",
reportRoutes
);

app.use("/api/doctor", doctorRoutes);

app.use(
"/api/appointments",
appointmentRoutes
);


app.use(
"/api/receptionist",
receptionistRoutes
);

app.use(
"/api/wellness",
wellnessRoutes
);

app.use(
"/api/medicine",
medicineRoutes
);

app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("HealthSync API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Auth routes loaded");

    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Server Working");
});

const path = require("path");
const { body } = require("express-validator");

app.use(
"/uploads",
express.static(
path.join(__dirname,"uploads")
)
);

const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(morgan("dev"));

app.use(rateLimit({
windowMs: 15 * 60 * 1000,
max: 100
}));

