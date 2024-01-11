import connectDB from "@/db/db"
import { NextResponse } from "next/server";
import logoDB from "@/model/logoModel";

export const POST = async (req) => {
    try {
        await connectDB();
        const body = await req.json();
        const id = body.userId;
        const updateId = body.picId;
        const findData = await logoDB.findOne({ userId: id });
        console.log('findData', findData)
        let storeData;
        let uodateData;

        if (findData === null) {
            storeData = await logoDB.create(body);
        } else {
            uodateData = await logoDB.findByIdAndUpdate(updateId, body, {
                new: true
            })
        }

        //success
        return NextResponse.json({
            message: 'Logo upload successfully done',
            success: true,
            storeData,
            uodateData
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Logo upload fail..',
            error: error?.message
        })
    }
}