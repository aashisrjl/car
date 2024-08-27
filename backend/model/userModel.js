const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
        
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
