import connectDB from "@/db/db"
import categoryDB from "@/model/categoryModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const category = await categoryDB.find({ userId: id });
        return NextResponse.json(category)

    } catch (error) {
        return NextResponse.json({
            message: 'category not found',
            error: error?.message
        })
    }
}