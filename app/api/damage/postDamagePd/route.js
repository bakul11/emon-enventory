import connectDB from "@/db/db"
import damagePdDB from "@/model/damageModal";
import productDB from "@/model/productModel";
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        await connectDB();
        const data = await req.json();
        const id = data?.productId;
        const qty = data?.quantity;
        const findPd = await productDB.findById(id);
        const oldPdQuantity = findPd.quantity;

        let damage;
        let product;

        if (oldPdQuantity > qty) {
            const updateQty = oldPdQuantity - qty;
            damage = await productDB.updateOne({ _id: id }, { $set: { quantity: updateQty } }).exec();
            product = await damagePdDB.create(data);
        } else {
            return NextResponse.json({
                stockOut:500,
                message: 'Product quantity out of stock'
            })
        }



        //success 
        return NextResponse.json({
            message: 'Damage product add successfully done!',
            success: true,
            product,
            damage
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Damage product add fail!',
            error: error?.message
        })
    }
}