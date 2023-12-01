import connectDB from "@/db/db"
import brandDB from "@/model/brandModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const brand = await brandDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Brand add successfully done!',
            success: true,
            brand
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Brand add fail!',
            error:error?.message
        })
    }
}