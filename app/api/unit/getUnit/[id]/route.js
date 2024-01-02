import connectDB from "@/db/db"
import unitDB from "@/model/unitModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const pd = await unitDB.find({ userId: id });
        return NextResponse.json(pd)

    } catch (error) {
        return NextResponse.json({
            message: 'Product unit not found',
            error: error?.message
        })
    }
}