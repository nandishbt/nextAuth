import mongoose from "mongoose";

// Connect to MongoDB
export default async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Connected to MongoDB");
        })

        connection.on('error',(e)=>{
            console.log("Error Connected to MongoDB"+e);
        })

        
    } catch (error) {
        console.log(error);
        
    }
}