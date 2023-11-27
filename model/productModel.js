import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    productName: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    subCategory: {
        type: String,
        required:true
    },
    brand: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    sku: {
        type: String,
        required:true
    },
    unit: {
        type: String,
        required:true
    },
    productPhoto: {
        type: String,
        required:true
    },
})

const productDB = mongoose.models.PRODUCT || mongoose.model('PRODUCT', productSchema);
export default productDB;
