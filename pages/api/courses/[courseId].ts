
// const course = await courseModel.find()   => []
// const course = await courseModel.findOne({_id:id})  => object 
// const Deletedcourse =await courseModel.findOneAndDelete({_id:id})   => object 
// const updatecourse =await courseModel.findOneAndUpdate({_id:id},{name,age, password})   => object  



import connectToDB from "../../../utils/db";
import courseModel from '../../../models/courses'

import mongoose, { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { courseId } = req?.query;




    

    if (req.method == "GET") {
        if (!isValidObjectId(courseId)) return res.status(422).json({ message: `id is not valid` });
        const course = await courseModel.findOne({ _id: courseId })

        if (course) {
            return res.json({ course: course });
        } else {
            return res.status(404).json({ message: "course not found" });
        }
    }





  else if (req.method == "PUT") {
    const { courseName, coursePrice, courseTeacherName, courseImage} = req.body;
  console.log('courseName : ',courseName);
  
    if (
        courseName.trim().length < 2 ||
        String(coursePrice).trim().length<5 ||
        coursePrice<=0 ||
        courseTeacherName.trim().length < 3||
        !courseImage
      ) {
        return res.status(422).json({ message: "data not valid" });
      }
      
      const isCourse = await courseModel.findOne({ _id: courseId })
        if (!isCourse)
            return res.status(404).json({ message: `course not found with id=${courseId}` });



        const updateCourse = await courseModel.findOneAndUpdate({ _id: courseId }, { courseName, coursePrice, courseTeacherName, courseImage })
       

        if (updateCourse) return res.status(200).json({ message: `update course with id=${courseId}` });

        return res
            .status(501)
            .json({ message: `error update course with id=${courseId}` });


    }





    

    else if (req.method == "DELETE") {

        if (!isValidObjectId(courseId)) return res.status(422).json({ message: `id is not valid` });

        const isCourse = await courseModel.findOne({ _id: courseId })

        if (!isCourse)
            return res.status(404).json({ message: `course not found with id=${courseId}` });

        const DeletedCourse = await courseModel.findOneAndDelete({ _id: courseId })
        if (!DeletedCourse) {
            return res
                .status(501)
                .json({ message: `error delete course with id=${courseId}` });
        }
        return res.status(200).json({ message: `delete course with id=${courseId}` });
    }







  



}


export default handler;
