import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import courseModel from '../../../models/courses'
import { isValidObjectId } from "mongoose";
import courseValidate from "@/validator/course";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "GET":
      
      
      try {
        const query = req?.query
        let courses:any
        
        if(Object.keys(query).length){
          
          courses =await courseModel.find({courseName:{$regex:query?.filter}},['-__v']).populate('teacherId',['fullName']);
          
        }else{
          
          courses =await courseModel.find({},'-__v').populate('teacherId',['fullName']);
        }
        
        return res.json(courses);
      } catch (error) {
         return res.status(500).json({message:error});
        
       }



    case "POST":
     try {
      const { courseName, coursePrice, teacherId, courseImage=''} = req.body;
     
    
    
      // validation id
      if (!isValidObjectId(teacherId))  return res.status(422).json({ message: `teacher is not valid` });
      
      // check exist user
      const checkCourse= await courseModel.findOne({courseName:courseName})
      if(checkCourse)return res.status(409).json({ message: "There is a course on the database"});
            
     // validation data
      const resultValidation= courseValidate(req.body)
      if (resultValidation!==true) return res.status(422).json(resultValidation);
      

     
      
      
      
      const course =  await courseModel.create({ courseName, coursePrice, teacherId, courseImage })
     
     
     if(course)return res.status(201).json({ message: "create new course", course: course });
    
     
     return res.status(500).json({ message: "error create new course"});
     
    } catch (error) {
     
      
       return res.status(500).json({ message: error});
      
     }

    default:
      return res.json({ message: "courses" });
  }
}

export default handler;
