import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import userModel from '@/models/users'



async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  if (req.method=='GET') {
 
       try {
        const query = req?.query
        let users:any
        
        if(Object.keys(query).length){
         
         
          users =await userModel.find({userName:{$regex:query?.filter}},['-__v'])
          
        }else{
          
          users =await userModel.find({},'-__v')
        }
        
        return res.json(users);
      } catch (error) {
         return res.status(500).json({message:error});
        
       }


  }
}

export default handler;
