import User from "@/Models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import connect from "@/dbConfig/dbConfig";

connect()



export async function POST(request:NextRequest){

    try {
        const {email,password} = await request.json()

        if(!email || !password){
            return NextResponse.json({error:"All fields are required"},{status:400})
        }

       const user =  await User.findOne({email})

       if(!user){
        return NextResponse.json({error:"Invalid Email"},{status:404})
       }

       const isPasswordCorrect =  await bcrypt.compare(password,user.password)

       if(!isPasswordCorrect){
        return NextResponse.json({error:"Invalid Password"},{status:404})
       }

      const token =  jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET!,{
        expiresIn:'1d'
       })


       const response = NextResponse.json({success:true,message:"User Logged in success",data:user},{status:200})

       response.cookies.set("token",token,{
        httpOnly:true
       })

       return response

       






        
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
        
    }

}