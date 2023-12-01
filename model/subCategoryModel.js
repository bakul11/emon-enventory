import mongoose from "mongoose";


const subCategorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: 'https://i.ibb.co/QYg7nZm/Screenshot-1.png'
    }
})


const subCategoryDB = mongoose.models.SUBCATEGORY || mongoose.model('SUBCATEGORY', subCategorySchema);

export default subCategoryDB;
