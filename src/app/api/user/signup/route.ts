import connect from "@/dbConfig/dbConfig";
import User from "@/Models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest){
    try {

        const body = await request.json()

        const {username,email,password} = body

        // validate data
        if(!username || !password || !email){
            return NextResponse.json({error:"All fields are required"},{status:400})
        }

        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        // create user

        let salt  = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        
        const user = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await user.save()

        await sendEmail({email:email,userId:savedUser._id,emailtype:"VERIFY"})

        return NextResponse.json({message:"user registered successfully",data:savedUser},{status:200})
        

  
    } catch (error:any) {

        return NextResponse.json({error:error.message},{status:500})
        
    }

}