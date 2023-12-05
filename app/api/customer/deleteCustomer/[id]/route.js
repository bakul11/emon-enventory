import connectDB from "@/db/db"
import customerDB from "@/model/customerModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const customer = await customerDB.findById(id);
        if (!customer) {
            return NextResponse.json({
                message: 'customer not found!'
            })
        }

        const removePd = await customerDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Customer remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Customer remove fail',
            error: error?.message
        })
    }
}