import connectDB from "@/db/db"
import { NextResponse } from "next/server";
import customerDB from "@/model/customerModel";

export const PUT = async (req,{ params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const updateCustomer = await customerDB.findById(id);
        if (!updateCustomer) {
            return NextResponse.json({
                message: 'customers not found!'
            })
        }

        const update = await customerDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Customer update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Customer update fail..',
            error: error?.message
        })
    }
}