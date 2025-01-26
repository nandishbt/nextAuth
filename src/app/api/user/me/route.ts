import { NextRequest, NextResponse } from "next/server";
import connect from '@/dbConfig/dbConfig'
import { getIdByToken } from "@/helpers/getIdToken";
import User from "@/Models/usermodel";

connect()

export const GET = async (request:NextRequest) =>{

    try {

        const id = await getIdByToken(request)

        if(!id){
            return NextResponse.json({error: 'PLease Login'},{status:404})
        }

        const user = await User.findById(id).select('-password')

        if(!user){
            return NextResponse.json({error: 'User not found'},{status:404})
        }
        
        return NextResponse.json({success: true, data: user},{status:200})

    } catch (error:any) {

        throw new Error(error.message)
        
    }


}