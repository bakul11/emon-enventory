import connectDB from "@/db/db"
import supplierDB from "@/model/supplierModel";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = params.id;
        const updateSupplier = await supplierDB.findById(id);
        console.log("updateSupplier", updateSupplier);

        if (!updateSupplier) {
            return NextResponse.json({
                message: 'Supplier not found!'
            })
        }

        const supplier = await supplierDB.findByIdAndUpdate(id, body, {
            new: true
        })

        //success
        return NextResponse.json({
            message: 'Supplier update successfully done',
            success: true,
            supplier
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Supplier update fail..',
            error: error?.message
        })
    }
}