const mongoose = require("mongoose");

const wellnessSchema = new mongoose.Schema({

patientId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Patient",
required:true
},

bmi:Number,

wellnessScore:Number,

waterIntake:{
type:Number,
default:0
},

sleepHours:{
type:Number,
default:0
},

medicineConsistency:{
type:Number,
default:0
}

},{
timestamps:true
});

module.exports =
mongoose.model(
"Wellness",
wellnessSchema
);