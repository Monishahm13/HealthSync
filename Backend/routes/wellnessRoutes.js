const express = require("express");
const router = express.Router();

const Wellness =
require("../models/Wellness");

const Patient =
require("../models/Patient");

const authMiddleware =
require("../middleware/authMiddleware");

router.post(
"/calculate",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

if(!patient){

return res.status(404).json({
message:"Patient not found"
});

}

const bmi =
patient.weight /
((patient.height/100)*
(patient.height/100));

let score = 100;

if(bmi < 18.5 || bmi > 25){
score -= 20;
}

const wellness =
await Wellness.create({

patientId:patient._id,

bmi:bmi.toFixed(2),

wellnessScore:score,

waterIntake:req.body.waterIntake,

sleepHours:req.body.sleepHours,

medicineConsistency:req.body.medicineConsistency

});

res.json({

success:true,
wellness

});

}
catch(error){

res.status(500).json({
error:error.message
});

}

});

router.get(
"/my",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

const data =
await Wellness.find({
patientId:patient._id
});

res.json(data);

}
catch(error){

res.status(500).json({
error:error.message
});

}

});

module.exports = router;