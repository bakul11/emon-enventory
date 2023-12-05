import connectDB from "@/db/db"
import customerDB from "@/model/customerModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const customer = await customerDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Customer add successfully done!',
            success: true,
            customer
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Customer add fail!',
            error:error?.message
        })
    }
}