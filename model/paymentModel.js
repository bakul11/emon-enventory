import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    amount: {
        type: String
    },
    customerId: {
        type: String
    },
    userType: {
        type: String
    },
    paymentType: {
        type: String
    },
    userName: {
        type: String
    },
    mobile: {
        type: String
    },
    tnxAmount: {
        type: String
    },
    transxType: {
        type: String
    },
    time: {
        type: String,
        default: new Date().toDateString()
    }
})

const paymentDB = mongoose.models.PAYMENT || mongoose.model('PAYMENT', paymentSchema);
export default paymentDB;