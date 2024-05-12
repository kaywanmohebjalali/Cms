import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import courseModel from '../../../models/courses'
import { isValidObjectId } from "mongoose";


async function handler(req:NextApiRequest, res:NextApiResponse){
  connectToDB();


  switch (req.method) {
    case "GET":
      
      
       try {
        const query = req?.query
        let courses:any
        
        if(Object.keys(query).length){
       
          courses =await courseModel.find({courseName:{$regex:query?.filter}}).populate('teacherId');
          
        }else{
          
          courses =await courseModel.find().populate('teacherId');
        }
        
        return res.json(courses);
      } catch (error) {
         return res.status(500).json({message:error});
        
       }



    case "POST":
     try {
      const { courseName, coursePrice, teacherId, courseImage} = req.body;
     
      if (!isValidObjectId(teacherId))  return res.status(422).json({ message: `teacher is not valid` });
      

      
      if (
        courseName.trim().length < 2 ||
        coursePrice<100000 ||
        !teacherId||
        !courseImage
      ) {

        
        return res.status(422).json({ message: "data not valid" });
      }
      
      const checkCourse= await courseModel.findOne({courseName:courseName})
      
      if(checkCourse)return res.status(409).json({ message: "There is a course on the database"});
      
      
      
      const course =  await courseModel.create({ courseName, coursePrice, teacherId, courseImage })
      console.log('courseTeacherName : ',course);
     
     
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
