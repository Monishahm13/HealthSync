const mongoose = require("mongoose");

const diagnosisSchema = new mongoose.Schema({

    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },

    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    symptoms:String,

    diagnosis:String,

    medicines:[String],

    advice:String,

    followUpDate:Date

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Diagnosis",
    diagnosisSchema
);