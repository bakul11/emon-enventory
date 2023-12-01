import connectDB from "@/db/db"
import brandDB from "@/model/brandModel";
import { NextResponse } from "next/server";

export const PUT = async (req,{ params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const brand = await brandDB.findById(id);
        if (!brand) {
            return NextResponse.json({
                message: 'brand not found!'
            })
        }

        const update = await brandDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Brand update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Brand update fail..',
            error: error?.message
        })
    }
}