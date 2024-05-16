import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import userModel from '../../../models/users'
import userValidate from "@/validator/user";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "POST":
     try {
      const { firstName, lastName, userName, email, password, userImage='' ,role} = req.body;
     
    
      
      
      const resultValidation= userValidate(req.body)
      if (resultValidation!==true) return res.status(422).json(resultValidation);
      
      
      const checkUser= await userModel.findOne({email:email})

      if(checkUser)return res.status(409).json({ message: "There is a user on the database"});
      
      
      
      const user =  await userModel.create({firstName, lastName, userName, email, password, userImage,role })
     
     
     if(user)return res.status(201).json({ message: "create new user", user: user });
    
     
     return res.status(500).json({ message: "error create new user"});
     
    } catch (error) {
     
      
       return res.status(500).json({ message: error});
      
     }

    default:
      return res.json({ message: "users" });
  }
}

export default handler;
