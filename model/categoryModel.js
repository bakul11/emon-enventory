import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    }
})


const categoryDB = mongoose.models.CATEGORY || mongoose.model('CATEGORY', categorySchema);

export default categoryDB;
