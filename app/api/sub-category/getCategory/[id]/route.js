import connectDB from "@/db/db"
import subCategoryDB from "@/model/subCategoryModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const category = await subCategoryDB.find({ userId: id });
        return NextResponse.json(category)

    } catch (error) {
        return NextResponse.json({
            message: 'Sub Category not found',
            error: error?.message
        })
    }
}