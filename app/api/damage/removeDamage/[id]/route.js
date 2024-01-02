import connectDB from "@/db/db"
import damagePdDB from "@/model/damageModal";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const product = await damagePdDB.findById(id);
        if (!product) {
            return NextResponse.json({
                message: 'product not found!'
            })
        }

        const removePd = await damagePdDB.findByIdAndDelete(id);

        //success
        return NextResponse.json({
            message: 'Product remove successfully done',
            success: true,
            removePd
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Product remove fail',
            error: error?.message
        })
    }
}