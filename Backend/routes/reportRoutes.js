const express = require("express");

const router = express.Router();

const upload =
require("../middleware/upload");

const authMiddleware =
require("../middleware/authMiddleware");

const Patient =
require("../models/Patient");

const Report =
require("../models/Report");



router.post(
"/upload",
authMiddleware,
upload.single("report"),
async(req,res)=>{

try{

const patient =
await Patient.findOne({
userId:req.user.id
});

const report =
await Report.create({

patientId:patient._id,

fileName:req.file.filename,

filePath:req.file.path,

reportType:req.body.reportType

});

res.status(201).json({

success:true,
report

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

const reports =
await Report.find({

patientId:patient._id

});

res.json(reports);

}
catch(error){

res.status(500).json({
error:error.message
});

}

});


module.exports = router;