import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


export const  getIdByToken = async (request:NextRequest) => {

    try {

        const token = await request.cookies.get("token")?.value;

        if(!token){
            console.log("Please Login");
            

           return null;
            
        }

        const decodedToken: any = await jwt.verify(token,process.env.JWT_SECRET!)

        return decodedToken.id;


        
    } catch (error) {

        console.log(error);
        
        
    }
}