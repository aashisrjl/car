const Kyc = require("../model/kycModel");
const User = require("../model/userModel");

exports.createKyc = async (req, res) => {
        const { documentType, documentNumber } = req.body;
        const userId = req.userId;

        if (!documentType || !documentNumber) {
            return res.status(400).json({
                message: 'Please fill all the fields'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please provide the document"
            });
        }

        const documentImage = req.file.filename;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const kyc = await Kyc.create({
            userId,
            documentType,
            documentNumber,
            documentImage 
        });

        res.status(200).json({
            message: "KYC submitted successfully",
            kyc
        });

};


exports.verifyKyc = async (req, res) => {
        const kycId = req.params.kycId;
        const { status, rejectionReason } = req.body;

        const kyc = await Kyc.findById(kycId);
        if (!kyc) {
            return res.status(404).json({
                message: "No KYC found"
            });
        }

        if (status !== 'approved' && status !== 'rejected') {
            return res.status(400).json({
                message: "Invalid status value. It must be 'approved' or 'rejected'."
            });
        }

        kyc.status = status;
        if (status === 'approved') {
            kyc.rejectionReason = null;
            kyc.verifiedAt = new Date().toISOString().split('T')[0]; // Format date to YYYY-MM-DD
        } else if (status === 'rejected') {
            if (!rejectionReason) {
                return res.status(400).json({
                    message: "Rejection reason must be provided when the status is 'rejected'."
                });
            }
            kyc.rejectionReason = rejectionReason;
        }

        await kyc.save();

        res.status(200).json({
            message: `KYC ${status} successfully`
        });
};

exports.getAllKyc = async (req, res) => {

        const kycs = await Kyc.find()
            .populate({
                path: 'userId', // Path to populate
                select: 'fullName email' // Fields to include from the User model
            });

        res.status(200).json(kycs);
};
