import connectDB from "@/db/db"
import authDB from "@/model/userModel";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export const PUT = async (req, { params }) => {
    try {
        await connectDB();
        const { id } = params;
        const user = await authDB.findById(id);
        if (!user) {
            return NextResponse.json({
                message: 'user not found'
            })
        }
        const { password } = await req.json();
        const hashPassword = await bcrypt.hash(password, 5);
        const updateUser = {
            password: hashPassword
        }
        const update = await authDB.findByIdAndUpdate(id, updateUser, {
            new: true
        })
        //success
        return NextResponse.json({
            message: 'Password update successfully done',
            success: true,
            update
        })

    } catch (error) {
        return NextResponse.json({
            message: 'Password update fail..',
            error: error?.message
        })
    }
}