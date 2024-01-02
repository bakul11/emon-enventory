import connectDB from "@/db/db"
import paymentDB from "@/model/paymentModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const payment = await paymentDB.find({ userId: id });
        return NextResponse.json(payment)

    } catch (error) {
        return NextResponse.json({
            message: 'payment data not found',
            error: error?.message
        })
    }
}