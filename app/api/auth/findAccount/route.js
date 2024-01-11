import connectDB from "@/db/db"
import authDB from "@/model/userModel";
import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    try {
        await connectDB();
        const { email } = await req.json();
        const user = await authDB.findOne({ email })

        if (!user) {
            return NextResponse.json({
                message: 'You have no an account!'
            })
        }

        //success message
        return NextResponse.json({
            message: 'Please set new password!',
            success: true,
            user
        })






    } catch (error) {
        return NextResponse.json({
            message: 'user not found',
            error: error?.message
        })
    }
}