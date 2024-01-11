import mongoose from "mongoose"

const logoSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    logo: {
        type: String,
        default: 'https://i.ibb.co/tmzC0F2/logo.png'
    }
})

const logoDB = mongoose.models.LOGO || mongoose.model('LOGO', logoSchema);
export default logoDB;