import mongoose from "mongoose";


const invoiceSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    address: {
        type: String
    }
})


const invoiceAddressDB = mongoose.models.INVOICEADDRESS || mongoose.model('INVOICEADDRESS', invoiceSchema);

export default invoiceAddressDB;
