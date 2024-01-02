import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
        // console.log("Database connected success");
    } catch (error) {
        console.log("Database connect fail...");
    }
}

export default connectDB;