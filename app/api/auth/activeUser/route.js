import connectDB from "@/db/db"
import authDB from "@/model/userModel";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const token = jwt.verify(data?.token, process.env.NEXT_PUBLIC_JWT_TOKEN);
        const user = await authDB.findOne({ email: token?.email });
        return NextResponse.json(user)

    } catch (error) {
        return NextResponse.json({
            message: 'user not found',
            error: error?.message
        })
    }
}