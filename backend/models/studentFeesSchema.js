const mongoose = require('mongoose');

// Define the installment schema
const installmentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

// Modify the studentFees schema to include fields from studentSchema
const studentFeesSchema = new mongoose.Schema({
    // Include fields from studentSchema
    name: {
        type: String,
        required: true,
    },
    rollNum: {
        type: Number,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    // Add fields specific to studentFeesSchema
    totalFees: {
        type: Number,
        required: true,
    },
    remainingFees: {
        type: Number,
        required: true,
    },
    installments: [installmentSchema], // Array of installments
});

module.exports = mongoose.model("StudentFees", studentFeesSchema);
