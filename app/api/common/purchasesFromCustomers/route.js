import connectDB from "@/db/db"
import customerDB from "@/model/customerModel";
import productDB from "@/model/productModel";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    try {
        await connectDB();
        const data = await req.json();

        const updatePromises = data?.cart.map(item => {
            const oldQty = item?.quantity;
            const newQty = item?.newQty;
            const updateQty = oldQty - newQty;
            return productDB.updateOne({ _id: item._id }, { $set: { quantity: updateQty } }).exec();
        });

        const id = data?.CustomerStoreData?.id;
        const updateDataCustomer = data?.CustomerStoreData;
        const findCustomer = await customerDB.findById(id)


        if (!findCustomer) {
            return NextResponse.json({
                message: 'customers not found!'
            })
        }
        const updateSupplier = await customerDB.findByIdAndUpdate(id, updateDataCustomer, {
            new: true
        })

        // success 
        return NextResponse.json({
            message: 'Product sell successfully done',
            success: true,
            updatePromises,
            updateSupplier
        })


    } catch (error) {
        return NextResponse.json({
            message: 'Product sell fail...',
            error: error?.message
        })
    }
}
