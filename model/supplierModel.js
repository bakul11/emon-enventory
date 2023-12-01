import mongoose from "mongoose";


const supplierSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    profile: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    },
    mobile: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    createDate: {
        type: String,
        default: new Date().toDateString()
    }
})


const supplierDB = mongoose.models.SUPPLIER || mongoose.model('SUPPLIER', supplierSchema);

export default supplierDB;
