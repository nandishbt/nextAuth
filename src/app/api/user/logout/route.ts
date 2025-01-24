import User from "@/Models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

connect()

export async function GET(){
    try{

        const response = NextResponse.json({
            message:"User Logged Out success"
        })

        response.cookies.set("token","",{
            httpOnly:true
        })

        return response

    }
    catch(error:any){
         return NextResponse.json({
                    error:error.message,
                    status:500
                })
    }
}