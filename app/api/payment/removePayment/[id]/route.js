import connectDB from "@/db/db"
import paymentDB from "@/model/paymentModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const payId = await paymentDB.findById(id);
        if (!payId) {
            return NextResponse.json({
                message: 'payment not found!'
            })
        }

        const removePd = await paymentDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'payment remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'payment remove fail',
            error: error?.message
        })
    }
}