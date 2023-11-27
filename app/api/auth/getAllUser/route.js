import connectDB from "@/db/db"
import authDB from "@/model/userModel";
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        await connectDB();
        const user = await authDB.find();
        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: 'user not found',
            error: error?.message
        })
    }
}