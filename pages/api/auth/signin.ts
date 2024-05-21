import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import userModel from '../../../models/users'
import { generateToken, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDB();


  if (req.method != 'POST') {
    return false
  }

  try {
    const { identifier, password} = req.body;


  
  // validation 
  
  if (!identifier.trim() || !password.trim()) return res.status(422).json('data is not valid');
  



    // exist user check
    const user = await userModel.findOne({ $or: [{ userName:identifier }, { email:identifier }] })
    if (user.length==0) return res.status(404).json({ message: "user don't exist with username or email" });
    

  // check password
  const isValidPassword=await verifyPassword(password,user?.password)
  if(!isValidPassword)return res.status(422).json({message:"username or email or password is not correct"})


   
    // create token
    const token = generateToken({email:user.email })




    // set-cookie
    if (token) return res.
      setHeader('Set-Cookie', serialize('token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })).
      status(201).
      json({ message: "login user" });


    return res.status(500).json({ message: "error login admin in server" });

  } catch (error) {


    return res.status(500).json({ message: error });

  }


}

export default handler;
