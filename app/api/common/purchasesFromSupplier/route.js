import connectDB from "@/db/db"
import productDB from "@/model/productModel";
import supplierDB from "@/model/supplierModel";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        await connectDB();
        const data = await req.json();

        const updatePromises = data?.cart.map(item => {
            return productDB.updateOne({ _id: item._id }, { $set: { quantity: item.newQty } }).exec();
        });

        const id = data?.supplierStoreData.id;
        const updateDataSupplier = data?.supplierStoreData;
        const findSupplier = await supplierDB.findById(id)


        if (!findSupplier) {
            return NextResponse.json({
                message: 'supplier not found!'
            })
        }
        const updateSupplier = await supplierDB.findByIdAndUpdate(id, updateDataSupplier, {
            new: true
        })

        // success 
        return NextResponse.json({
            message: 'Product purchases successfully done',
            success: true,
            updatePromises,
            updateSupplier
        })


    } catch (error) {
        return NextResponse.json({
            message: 'Product purchases fail',
            error: error?.message
        })
    }
}
