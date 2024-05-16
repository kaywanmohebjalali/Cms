import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import userModel from '@/models/users'
import userValidate from "@/validator/user";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "GET":
       try {
        const query = req?.query
        let users:any
        
        if(Object.keys(query).length){
       
          users =await userModel.find({firstName:{$regex:query?.filter}},['-__v'])
          
        }else{
          
          users =await userModel.find({},'-__v')
        }
        
        return res.json(users);
      } catch (error) {
         return res.status(500).json({message:error});
        
       }



    case "POST":
     try {
      const { firstName, lastName, userName, email, password, userImage='' ,role} = req.body;
     
    
      console.log(req.body);
      
      
      const resultValidation= userValidate(req.body)
      if (resultValidation!==true) return res.status(422).json(resultValidation);
      
      
      const checkUser= await userModel.findOne({userName:userName})
      
      if(checkUser)return res.status(409).json({ message: "There is a admin on the database"});
      
      
      
      const user =  await userModel.create({ firstName, lastName, userName, email, password, userImage,role })
      
      
      
      if(user)return res.status(201).json({ message: "create new admin", user: user });
    
     
     return res.status(500).json({ message: "error create new admin"});
     
    } catch (error) {
     
      
      console.log('error  : ',error);
       return res.status(500).json({ message: error});
      
     }

    default:
      return res.json({ message: "admins" });
  }
}

export default handler;
