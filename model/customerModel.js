import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userName: {
        type: String
    },
    productPrice: {
        type: String,
        default: 0
    },
    email: {
        type: String,
        default: "N/A"
    },
    mobile: {
        type: Number
    },
    address: {
        type: String,
        default: "N/A"
    },
    dueTk: {
        type: Number,
        default: 0
    },
    receivedTk: {
        type: Number,
        default: 0
    },
    oldDue: {
        type: Number,
        default: 0
    },
    time: {
        type: String,
        default: new Date().toDateString()
    }
})

const customerDB = mongoose.models.CUSTOMER || mongoose.model('CUSTOMER', customerSchema);
export default customerDB;