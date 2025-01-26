"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function signUp() {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const signup = async (e:any) => {

    try {
        e.preventDefault();

      // validate data
      if (!data.username || !data.email || !data.password) {
        alert("All fields are required");
        return;
      }

      const res = await axios.post("/api/user/signup", {...data});

      console.log(res);

      alert("User registered successfully");

      setdata({
        username: "",
        email: "",
        password: "",
      });

      router.push('/login')

    } catch (error: any) {
        
      console.log(error.message);
    }
  };

  const update = (e: any) => {
    
    setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log(data);
    
  };

  useEffect(()=>{
    console.log(data);
    
  },[])
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form onSubmit={signup} >
        <input
        className="w-full px-6 py-2 border-none outline-none rounded-lg mb-4 text-black" 
          name="username"
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={update}
        /><br></br>

        <input
         className="w-full px-6 py-2 border-none outline-none rounded-lg mb-4 text-black" 
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={update}
        /><br></br>

        <input
         className="w-full px-6 py-2 border-none outline-none rounded-lg mb-4 text-black "
         name = 'password'
          type="password"
          placeholder="password"
          value={data.password}
          onChange={update}
        /><br></br>

        <button className="px-6 py-2 bg-yellow-500 rounded-xl text-slate-600" type="submit">Sign Up</button>
      </form>
    </div>
  );
}
