import connectDB from "@/db/db"
import customerDB from "@/model/customerModel";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const customer = await customerDB.find({ userId: id });
        return NextResponse.json(customer)

    } catch (error) {
        return NextResponse.json({
            message: 'customer not found',
            error: error?.message
        })
    }
}