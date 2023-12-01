import connectDB from "@/db/db"
import categoryDB from "@/model/categoryModel";
import { NextResponse } from "next/server";

export const PUT = async (req,{ params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const category = await categoryDB.findById(id);
        if (!category) {
            return NextResponse.json({
                message: 'Category not found!'
            })
        }

        const update = await categoryDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Category update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Category update fail..',
            error: error?.message
        })
    }
}