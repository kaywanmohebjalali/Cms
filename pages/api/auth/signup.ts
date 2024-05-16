import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import adminModel from '../../../models/users'
import adminValidate from "@/validator/admin";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "POST":
     try {
      const { fullName, email, password, adminImage='' ,status} = req.body;
     
    
      
      
      const resultValidation= adminValidate(req.body)
      if (resultValidation!==true) return res.status(422).json(resultValidation);
      
      
      const checkAdmin= await adminModel.findOne({fullName:fullName})
      
      if(checkAdmin)return res.status(409).json({ message: "There is a admin on the database"});
      
      
      
      const admin =  await adminModel.create({fullName, email, password, adminImage,status })
     
     
     if(admin)return res.status(201).json({ message: "create new admin", admin: admin });
    
     
     return res.status(500).json({ message: "error create new admin"});
     
    } catch (error) {
     
      
       return res.status(500).json({ message: error});
      
     }

    default:
      return res.json({ message: "admins" });
  }
}

export default handler;
