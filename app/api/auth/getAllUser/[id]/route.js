import connectDB from "@/db/db"
import authDB from "@/model/userModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const user = await authDB.find({ userId: id });
        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: 'user not found',
            error: error?.message
        })
    }
}