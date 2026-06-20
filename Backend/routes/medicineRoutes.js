const express = require("express");
const router = express.Router();

const Medicine =
require("../models/MedicineReminder");

const Patient =
require("../models/Patient");

const authMiddleware =
require("../middleware/authMiddleware");

// ADD MEDICINE

router.post(
"/add",
authMiddleware,
async (req, res) => {

try {

const patient =
await Patient.findOne({
userId: req.user.id
});

const medicine =
await Medicine.create({
patientId: patient._id,
medicineName: req.body.medicineName,
dosage: req.body.dosage,
timings: req.body.timings,
startDate: req.body.startDate,
endDate: req.body.endDate
});

res.json({
success: true,
medicine
});

}
catch (error) {

res.status(500).json({
error: error.message
});

}

}
);

// GET MEDICINES

router.get(
"/my",
authMiddleware,
async (req, res) => {

try {

const patient =
await Patient.findOne({
userId: req.user.id
});

const medicines =
await Medicine.find({
patientId: patient._id
});

res.json(medicines);

}
catch (error) {

res.status(500).json({
error: error.message
});

}

}
);

// UPDATE STATUS

router.put(
"/status/:id",
authMiddleware,
async (req, res) => {

try {

const medicine =
await Medicine.findByIdAndUpdate(
req.params.id,
{ status: req.body.status },
{ new: true }
);

res.json({
success: true,
medicine
});

}
catch (error) {

res.status(500).json({
error: error.message
});

}

}
);

module.exports = router;