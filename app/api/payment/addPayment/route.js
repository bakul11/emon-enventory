import connectDB from "@/db/db"
import paymentDB from "@/model/paymentModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json()
        const storeData = await paymentDB.create(data);

        //success
        return NextResponse.json({
            message: 'payment add successfully done',
            success: true,
            storeData
        })
    } catch (error) {
        return NextResponse.json({
            message: 'payment add fail ! please try again',
            error: error?.message
        })
    }
}