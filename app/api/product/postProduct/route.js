import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const product = await productDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Product add successfully done!',
            success: true,
            product
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product add fail!',
            error:error?.message
        })
    }
}