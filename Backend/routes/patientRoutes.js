const express = require("express");
const Patient = require("../models/Patient");
const User = require("../models/User");
const Diagnosis = require("../models/Diagnosis");
const MedicalHistory = require("../models/MedicalHistory");
const Report = require("../models/Report");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
"/profile",
authMiddleware,
async(req,res)=>{

try{

const {

age,
gender,
phoneNumber,
bloodGroup,
height,
weight,
allergies,
smokingHabits,
alcoholHabits

} = req.body;

const patient = await Patient.create({

userId:req.user.id,

age,
gender,
phoneNumber,
bloodGroup,
height,
weight,
allergies,
smokingHabits,
alcoholHabits

});

await User.findByIdAndUpdate(
req.user.id,
{
profileCompleted:true
}
);

res.status(201).json({
success:true,
patient
});

}
catch(error){

res.status(500).json({
success:false,
error:error.message
});

}

});

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {

      const patient = await Patient.findOne({
        userId: req.user.id
      }).populate(
        "userId",
        "name email"
      );

      const history =
        await MedicalHistory.findOne({
          patientId: patient._id
        });

      res.json({
        patient,
        history
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);

router.get(
  "/records",
  authMiddleware,
  async (req, res) => {
    try {

      const patient =
        await Patient.findOne({
          userId: req.user.id
        });

      const reports =
        await Report.find({
          patientId: patient._id
        });

      const diagnosis =
        await Diagnosis.find({
          patientId: patient._id
        });

      res.json({
        reports,
        diagnosis
      });

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  }
);



const calculateBMI =
require("../utils/bmiCalculator");






module.exports = router;