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
            if (oldQty > newQty) {
                const updateQty = oldQty - newQty;
                return productDB.updateOne({ _id: item._id }, { $set: { quantity: updateQty } }).exec();
            } else {
                return NextResponse.json({
                    stockOut: 500,
                    message: 'Product quantity out of stock'
                })
            }
        });


        if (updatePromises) {
            const id = data?.CustomerStoreData?.id;
            const updateDataCustomer = data?.CustomerStoreData;
            const findCustomer = await customerDB.findById(id)


            if (!findCustomer) {
                return NextResponse.json({
                    message: 'customers not found!'
                })
            }
            const updateCustomer = await customerDB.findByIdAndUpdate(id, updateDataCustomer, {
                new: true
            })


            // success 
            return NextResponse.json({
                message: 'Product sell successfully done',
                success: true,
                updatePromises,
                updateCustomer
            })
        }



    } catch (error) {
        return NextResponse.json({
            message: 'Product sell fail...',
            error: error?.message
        })
    }
}
