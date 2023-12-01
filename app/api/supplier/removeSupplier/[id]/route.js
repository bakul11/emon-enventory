import connectDB from "@/db/db"
import supplierDB from "@/model/supplierModel";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const supplier = await supplierDB.findById(id);
        if (!supplier) {
            return NextResponse.json({
                message: 'Supplier not found!'
            })
        }

        const removeSupplier = await supplierDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Supplier remove successfully done',
            success: true,
            removeSupplier
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Supplier remove fail',
            error: error?.message
        })
    }
}