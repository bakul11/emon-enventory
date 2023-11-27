import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server";

export const PUT = async (req,{ params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const updateProduct = await productDB.findById(id);
        if (!updateProduct) {
            return NextResponse.json({
                message: 'product not found!'
            })
        }

        const update = await productDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Product update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product update fail..',
            error: error?.message
        })
    }
}