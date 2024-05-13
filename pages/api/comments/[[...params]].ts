import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import commentModel from '../../../models/Comments'
import { isValidObjectId } from "mongoose";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "GET":
      
      
       try {
        const query = req?.query
        let comment:any
        
        if(Object.keys(query).length){
       
          comment =await commentModel.find({title:{$regex:query?.filter}}).populate('courseId');
          
        }else{
          
          comment =await commentModel.find({}).populate('courseId');
        }
        
        return res.json(comment);
      } catch (error) {
         return res.status(500).json({message:error});
        
       }



    case "POST":
     try {
      const { title, courseId} = req.body;
     
      if (!isValidObjectId(courseId))  return res.status(422).json({ message: `comment is not valid` });
      

      
      if (
        title.trim().length < 2 ||
        !courseId
      ) {
        return res.status(422).json({ message: "data not valid" });
      }

      
      
      const comment =  await commentModel.create({  title, courseId })
     
     
     
     if(comment)return res.status(201).json({ message: "create new comment", course: comment });
    
     
     return res.status(500).json({ message: "error create new comment"});
     
    } catch (error) {
     
      
       return res.status(500).json({ message: error});
      
     }

    default:
      return res.json({ message: "comments" });
  }
}

export default handler;
