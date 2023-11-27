import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server";

export const GET = async (req,{ params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await productDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'product not found!'
            })
        }

        //success
        return NextResponse.json(product)

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found',
            error: error?.message
        })
    }
}