const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

const authMiddleware =
require("../middleware/authMiddleware");


// ============================
// BOOK APPOINTMENT
// ============================

router.post(
"/book",
authMiddleware,
async (req, res) => {

try {

const patient =
await Patient.findOne({
userId: req.user.id
});

if (!patient) {

return res.status(404).json({
success: false,
message: "Patient not found"
});

}

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const lastAppointment =
await Appointment.findOne({
  createdAt: {
    $gte: today,
    $lt: tomorrow
  }
})
.sort({ tokenNumber: -1 });

const nextToken =
lastAppointment
  ? lastAppointment.tokenNumber + 1
  : 1;

const appointment =
await Appointment.create({

patientId: patient._id,

doctorId: req.body.doctorId,

appointmentDate: req.body.appointmentDate,

tokenNumber: nextToken

});

res.status(201).json({
success: true,
appointment
});

}
catch (error) {

console.log(error);

res.status(500).json({
success: false,
error: error.message
});

}

}
);


// ============================
// MY APPOINTMENTS
// ============================

router.get(
"/my",
authMiddleware,
async (req, res) => {

try {

const patient =
await Patient.findOne({
userId: req.user.id
});

if (!patient) {

return res.status(404).json({
success: false,
message: "Patient not found"
});

}

const appointments =
await Appointment.find({
patientId: patient._id
})
.populate(
"doctorId",
"name email role"
);

res.json(appointments);

}
catch (error) {

res.status(500).json({
success: false,
error: error.message
});

}

}
);


// ============================
// LIVE QUEUE
// ============================

router.get(
"/queue",
authMiddleware,
async (req, res) => {

try {

const queue =
await Appointment.find({
status: {
$in: [
"Booked",
"Waiting",
"In Consultation"
]
}
})
.populate(
"doctorId",
"name"
)
.sort({
createdAt: 1
});

res.json(queue);

}
catch (error) {

res.status(500).json({
success: false,
error: error.message
});

}

}
);


// ============================
// UPDATE STATUS
// ============================

router.put(
"/status/:id",
authMiddleware,
async (req, res) => {

try {

const appointment =
await Appointment.findByIdAndUpdate(

req.params.id,

{
status: req.body.status
},

{
returnDocument: "after"
}

);

res.json({
success: true,
appointment
});

}
catch (error) {

res.status(500).json({
success: false,
error: error.message
});

}

}
);

module.exports = router;