import connectDB from "@/db/db"
import categoryDB from "@/model/categoryModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await categoryDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'Category not found!'
            })
        }

        const removePd = await categoryDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Category remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Category remove fail',
            error: error?.message
        })
    }
}