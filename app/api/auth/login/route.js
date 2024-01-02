import connectDB from "@/db/db";
import authDB from "@/model/userModel";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

export const POST = async (req) => {
    try {
        await connectDB();
        const { email, password } = await req.json();
        const user = await authDB.findOne({ email });


        if (!user) {
            return NextResponse.json({
                message: 'You have no an account!'
            })
        }
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return NextResponse.json({
                message: 'Password is Wrong!'
            })
        }
        //jwt token 
        const token = jwt.sign({ email: user?.email, id: user?._id }, process.env.NEXT_PUBLIC_JWT_TOKEN, { expiresIn: '10d' });

        //success 
        return NextResponse.json({
            success: true,
            message: 'Login successfully done!',
            user,
            token
        })


    } catch (error) {
        return NextResponse.json({
            message: 'Login fail ! Please try again',
            error: error
        })
    }
}