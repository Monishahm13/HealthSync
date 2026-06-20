const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");


// -------------------------
// VIEW QUEUE
// -------------------------
router.get("/queue", authMiddleware, async (req, res) => {
  try {
    const queue = await Appointment.find()
      .populate({
        path: "patientId",
        populate: {
          path: "userId",
          select: "name"
        }
      })
      .populate("doctorId", "name")
      .sort({ createdAt: 1 });

    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -------------------------
// GET SINGLE PATIENT
// -------------------------
router.get("/patient/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("userId", "name email");

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -------------------------
// GET ALL PATIENTS
// -------------------------
router.get("/patients", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate("userId", "name email");

    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -------------------------
// BOOK APPOINTMENT
// -------------------------
router.post("/book-appointment", authMiddleware, async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate } = req.body;

    if (!patientId || !doctorId || !appointmentDate) {
      return res.status(400).json({
        error: "patientId, doctorId and appointmentDate are required"
      });
    }

    const lastAppointment = await Appointment.findOne()
      .sort({ tokenNumber: -1 });

    const nextToken = lastAppointment
      ? lastAppointment.tokenNumber + 1
      : 1;

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      tokenNumber: nextToken,
      status: "Booked"
    });

    res.status(201).json({
      success: true,
      appointment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// -------------------------
// DASHBOARD
// -------------------------
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayAppointments = await Appointment.countDocuments({
      appointmentDate: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const pendingAppointments = await Appointment.countDocuments({
      status: { $in: ["Booked", "Waiting"] }
    });

    const availableDoctors = await User.countDocuments({
      role: "doctor"
    });

    res.json({
      totalPatients,
      todayAppointments,
      pendingAppointments,
      availableDoctors
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;