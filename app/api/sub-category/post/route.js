import connectDB from "@/db/db"
import subCategoryDB from "@/model/subCategoryModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const category = await subCategoryDB.create(data);

        //success 
        return NextResponse.json({
            message: 'Sub category add successfully done!',
            success: true,
            category
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Sub category add fail!',
            error:error?.message
        })
    }
}