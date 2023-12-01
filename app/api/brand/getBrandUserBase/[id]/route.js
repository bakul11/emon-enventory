import connectDB from "@/db/db"
import brandDB from "@/model/brandModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const brand = await brandDB.find({ userId: id });
        return NextResponse.json(brand)

    } catch (error) {
        return NextResponse.json({
            message: 'brand not found',
            error: error?.message
        })
    }
}