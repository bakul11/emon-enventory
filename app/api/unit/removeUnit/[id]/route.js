import connectDB from "@/db/db"
import unitDB from "@/model/unitModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await unitDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'product unit not found!'
            })
        }

        const removePd = await unitDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Unit remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Unit remove fail',
            error: error?.message
        })
    }
}