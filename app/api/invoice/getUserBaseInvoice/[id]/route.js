import connectDB from "@/db/db";
import invoiceAddressDB from "@/model/invoiceDataModel";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const id = params.id;
        const invoice = await invoiceAddressDB.findOne({ userId: id });
        return NextResponse.json(invoice)

    } catch (error) {
        return NextResponse.json({
            message: 'invoice not found',
            error: error
        })
    }
}