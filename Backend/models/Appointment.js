const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    appointmentDate: {
        type: Date,
        required: true
    },

    tokenNumber: {
        type: Number,
        required: true,
        default: 1
    },

    status: {
        type: String,
        enum: [
            "Booked",
            "Waiting",
            "In Consultation",
            "Completed",
            "Cancelled"
        ],
        default: "Booked"
    }
},
{
    timestamps: true
}
);

module.exports =
mongoose.models.Appointment ||
mongoose.model(
    "Appointment",
    appointmentSchema
);