import connectDB from "@/db/db"
import { NextResponse } from "next/server";
import invoiceAddressDB from "@/model/invoiceDataModel";

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = body.userId;
        const updateId = body.invoiceId;
        const findData = await invoiceAddressDB.findOne({ userId: id });
        let storeData;
        let uodateData;

        if (findData === null) {
            storeData = await invoiceAddressDB.create(body);
        } else {
            uodateData = await invoiceAddressDB.findByIdAndUpdate(updateId, body, {
                new: true
            })
        }

        //success
        return NextResponse.json({
            message: 'Invoice update successfully done',
            success: true,
            storeData,
            uodateData
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Invoice upload fail..',
            error: error?.message
        })
    }
}