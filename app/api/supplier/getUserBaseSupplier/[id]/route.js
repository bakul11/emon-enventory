import connectDB from "@/db/db"
import supplierDB from "@/model/supplierModel";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const searchParams = useSearchParams()
        console.log('searchParams...', searchParams)

        const supplier = await supplierDB.find();
        return NextResponse.json(supplier)

    } catch (error) {
        return NextResponse.json({
            message: 'Supplier not found',
            error: error?.message
        })
    }
}