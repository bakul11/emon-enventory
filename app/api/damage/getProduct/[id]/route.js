import connectDB from "@/db/db"
import damagePdDB from "@/model/damageModal";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const pd = await damagePdDB.find({ userId: id });
        return NextResponse.json(pd)

    } catch (error) {
        return NextResponse.json({
            message: 'Product not found',
            error: error?.message
        })
    }
}