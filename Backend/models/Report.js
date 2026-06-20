const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },

    fileName:String,

    filePath:String,

    reportType:String,

    uploadedBy:{
        type:String,
        default:"patient"
    }

},
{
    timestamps:true
});

module.exports =
mongoose.model("Report",reportSchema);