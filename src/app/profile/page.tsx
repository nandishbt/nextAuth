'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function (){
    const [data, setdata] = useState({username:"",_id:""})

    const fetch = async () =>{
        try {

            const res = await  axios.get('/api/user/me')
            console.log(res.data.data.username);
            setdata(res.data.data)
            
        } catch (error:any) {

            console.log(error.message);
            
            
        }
    }

    const logout = async ()=>{

        try {
            const res = await axios.get('/api/user/logout')
            alert('user logged out')

            
        } catch (error:any) {
            console.log(error.message);
            
            
        }
    }

    useEffect(()=>{
        fetch()
    },[])

    return(
        <>
        <div>This is {data?.username}</div>
        <Link href={`/profile/${data?._id}`}>  <button >click here to get all my data</button></Link><br></br>
        <button className="px-6 py-2 bg-yellow-500 rounded-xl text-slate-600" onClick={logout}>logout</button>
        
        </>
        
    )

}