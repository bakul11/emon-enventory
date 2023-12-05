import mongoose from "mongoose"

const customerSchema = new mongoose.Schema({
    userId: {
        type:String
    },
    userName: {
        type:String
    },
    email: {
        type:String
    },
    mobile: {
        type:Number
    },
    address: {
        type:String
    },
    dueTk: {
        type:Number
    },
    receivedTk: {
        type:Number
    }
})

const customerDB = mongoose.models.CUSTOMER || mongoose.model('CUSTOMER', customerSchema);
export default customerDB;