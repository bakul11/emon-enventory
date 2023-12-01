import connectDB from "@/db/db"
import supplierDB from "@/model/supplierModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const supplier = await supplierDB.find({ userId: id });
        return NextResponse.json(supplier)

    } catch (error) {
        return NextResponse.json({
            message: 'Supplier not found',
            error: error?.message
        })
    }
}