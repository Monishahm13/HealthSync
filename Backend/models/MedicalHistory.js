const mongoose = require("mongoose");

const medicalHistorySchema = new mongoose.Schema({

    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },

    diseases:[String],

    surgeries:[String],

    medications:[String],

    consultations:[String],

    allergiesHistory:[String],

    familyHistory:[String],

    notes:String

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "MedicalHistory",
    medicalHistorySchema
);