import mongoose from "mongoose"

const damageSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    userId: {
        type: String
    },
    title: {
        type: String
    },
    quantity: {
        type: String
    },
    photo: {
        type: String,
        default: ''
    },
    time: {
        type: String,
        default: new Date().toDateString()
    }
})

const damagePdDB = mongoose.models.DAMAGE || mongoose.model('DAMAGE', damageSchema);
export default damagePdDB;