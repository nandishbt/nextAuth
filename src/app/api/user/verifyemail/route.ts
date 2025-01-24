import User from "@/Models/usermodel";
import { NextRequest, NextResponse } from "next/server";

import connect from "@/dbConfig/dbConfig";

connect()


export async function POST(request:NextRequest){

    try {

        const {token} = await request.json();

        if(!token){
            return NextResponse.json({error:"Token is required"},{status:400})
        }

        const user = await User.findOne({verificationToken:token,
            verificationExpires:{$gt:Date.now()}
        })

        if(!user){
            return NextResponse.json({error:"Invalid or expired token"},{status:401})
        }

        user.isverified = true;
        user.verificationToken = undefined
        user.verificationExpires = undefined

        await user.save();


        return NextResponse.json({
            success:true,
            message:"Email verified successfully",
            data:user
        })
        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
} 