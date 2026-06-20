const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({

patientId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Patient",
required:true
},

medicineName:{
type:String,
required:true
},

dosage:{
type:String
},

timings:[
{
type:String
}
],

startDate:{
type:Date,
default:Date.now
},

endDate:Date,

status:{
type:String,
enum:["Active","Completed"],
default:"Active"
}

},{
timestamps:true
});

module.exports =
mongoose.model("MedicineReminder", medicineSchema);