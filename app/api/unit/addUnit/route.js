import connectDB from "@/db/db"
import unitDB from "@/model/unitModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const product = await unitDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Unit add successfully done!',
            success: true,
            product
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Unit add fail!',
            error: error?.message
        })
    }
}