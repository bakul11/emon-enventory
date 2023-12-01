import connectDB from "@/db/db"
import supplierDB from "@/model/supplierModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const supplier = await supplierDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Supplier add successfully done!',
            success: true,
            supplier
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Supplier add fail!',
            error:error?.message
        })
    }
}