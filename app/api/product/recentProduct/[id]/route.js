import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await productDB.find({ userId: id }).sort({ productName: 1 })
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json({
            message: 'product not found',
            error: error?.message
        })
    }
}