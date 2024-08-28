const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kycSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documentType: {
        type: String,
        required: true,
        enum: ['passport', 'national_id', 'driver_license'],
    },
    documentNumber: {
        type: String,
        required: true,
    },
    documentImage: {
        type: String, 
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending', 
    },
    rejectionReason: {
        type: String, 
        default: ''
    },
    submittedAt: {
        type: Date,
        default: Date.now, 
    },
    verifiedAt: {
        type: Date, 
    }
});

const Kyc = mongoose.model('Kyc', kycSchema);
module.exports = Kyc;
