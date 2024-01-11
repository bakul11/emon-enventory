import connectDB from "@/db/db";
import logoDB from "@/model/logoModel";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const logo = await logoDB.findOne({ userId: id });
        return NextResponse.json(logo)

    } catch (error) {
        return NextResponse.json({
            message: 'logo not found',
            error: error
        })
    }
}