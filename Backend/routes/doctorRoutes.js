const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Patient = require("../models/Patient");
const MedicalHistory = require("../models/MedicalHistory");
const Report = require("../models/Report");
const Diagnosis = require("../models/Diagnosis");

const authMiddleware =
require("../middleware/authMiddleware");




console.log("Doctor Routes Loaded");


router.get(
"/patients",
authMiddleware,
async(req,res)=>{

try{

const patients =
await Patient.find()
.populate("userId","name");

res.json(patients);

}
catch(error){

res.status(500).json({
error:error.message
});

}

});

router.get(
"/patient/:id",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findById(
req.params.id
).populate(
"userId",
"name"
);

const history =
await MedicalHistory.findOne({
patientId:req.params.id
});

const reports =
await Report.find({
patientId:req.params.id
});

const diagnosis =
await Diagnosis.find({
patientId:req.params.id
});

res.json({

patient,
history,
reports,
diagnosis

});

}
catch(error){

res.status(500).json({
error:error.message
});

}

});


router.post(
"/diagnosis/:patientId",
authMiddleware,
async(req,res)=>{

try{

const diagnosis =
await Diagnosis.create({

patientId:req.params.patientId,

doctorId:req.user.id,

symptoms:req.body.symptoms,

diagnosis:req.body.diagnosis,

medicines:req.body.medicines,

advice:req.body.advice,

followUpDate:req.body.followUpDate

});

res.status(201).json({

success:true,
diagnosis

});

}
catch(error){

res.status(500).json({
error:error.message
});

}

});

router.get(
"/all-doctors",
authMiddleware,
async (req, res) => {

try {

const doctors =
await User.find({
role: "doctor"
}).select(
"_id name email"
);

res.json(doctors);

}
catch(error){

res.status(500).json({
error:error.message
});

}

});


console.log("Doctor Routes Loaded");





module.exports = router;