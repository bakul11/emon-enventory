import mongoose from "mongoose";


const brandSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    }
})


const brandDB = mongoose.models.BRAND || mongoose.model('BRAND', brandSchema);

export default brandDB;
