import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    productName: {
        type: String
    },
    productCode: {
        type: String
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    brand: {
        type: String,
        default: 'No Brand'
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number
    },
    unit: {
        type: String
    },
    productPhoto: {
        type: String
    }
})

const productDB = mongoose.models.PRODUCT || mongoose.model('PRODUCT', productSchema);
export default productDB;
