import connectDB from "@/db/db"
import subCategoryDB from "@/model/subCategoryModel";
import { NextResponse } from "next/server";

export const PUT = async (req,{ params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const category = await subCategoryDB.findById(id);
        if (!category) {
            return NextResponse.json({
                message: 'Sub Category not found!'
            })
        }

        const update = await subCategoryDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Sub Category update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Sub Category update fail..',
            error: error?.message
        })
    }
}