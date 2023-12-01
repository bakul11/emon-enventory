import connectDB from "@/db/db"
import categoryDB from "@/model/categoryModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const category = await categoryDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Category add successfully done!',
            success: true,
            category
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Category add fail!',
            error:error?.message
        })
    }
}