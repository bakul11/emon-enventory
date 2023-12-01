import connectDB from "@/db/db"
import brandDB from "@/model/brandModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const brand = await brandDB.findById(id);
        if (!brand) {
            return NextResponse.json({
                message: 'Brand not found!'
            })
        }

        const removePd = await brandDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Brand remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Brand remove fail',
            error: error?.message
        })
    }
}