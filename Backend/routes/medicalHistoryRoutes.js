const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const Patient =
require("../models/Patient");

const MedicalHistory =
require("../models/MedicalHistory");

router.post(
"/",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

const history =
await MedicalHistory.create({

patientId:patient._id,

diseases:req.body.diseases,

surgeries:req.body.surgeries,

medications:req.body.medications,

consultations:req.body.consultations,

allergiesHistory:req.body.allergiesHistory,

familyHistory:req.body.familyHistory,

notes:req.body.notes

});

res.status(201).json({
success:true,
history
});

}
catch(error){

res.status(500).json({
error:error.message
});

}

});


router.get(
"/",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

const history =
await MedicalHistory.findOne({
patientId:patient._id
});

res.json(history);

}
catch(error){

res.status(500).json({
error:error.message
});

}

});

router.put(
"/",
authMiddleware,
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

const history =
await MedicalHistory.findOneAndUpdate(

{
patientId:patient._id
},

req.body,

{
  returnDocument: "after"
}

);

res.json({
success:true,
history
});

}
catch(error){

res.status(500).json({
error:error.message
});

}

});





module.exports = router;