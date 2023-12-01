import connectDB from "@/db/db"
import subCategoryDB from "@/model/subCategoryModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await subCategoryDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'Sub Category not found!'
            })
        }

        const removePd = await subCategoryDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Sub Category remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Sub Category remove fail',
            error: error?.message
        })
    }
}