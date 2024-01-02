import mongoose from "mongoose"

const unitSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    }
})

const unitDB = mongoose.models.UNIT || mongoose.model('UNIT', unitSchema);
export default unitDB;