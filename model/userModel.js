import mongoose from "mongoose";


const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    profile: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    },
    role: {
        type: String,
        default: 'user'
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    createDate: {
        type: String,
        default: new Date().toDateString()
    }
})


const authDB = mongoose.models.USER || mongoose.model('USER', authSchema);

export default authDB;
