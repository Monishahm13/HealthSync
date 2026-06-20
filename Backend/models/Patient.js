const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    age:Number,

    gender:String,

    phoneNumber:String,

    bloodGroup:String,

    height:Number,

    weight:Number,

    allergies:String,

    smokingHabits:String,

    alcoholHabits:String

},
{
    timestamps:true
}
);

module.exports = mongoose.model("Patient", patientSchema);