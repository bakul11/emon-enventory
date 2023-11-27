import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await productDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'product not found!'
            })
        }

        const removePd = await productDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Product Remove Successfully Done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product remove fail',
            error: error?.message
        })
    }
}