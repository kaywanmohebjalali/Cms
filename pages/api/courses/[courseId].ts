


import connectToDB from "../../../utils/db";
import courseModel from '../../../models/courses'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { courseId } = req?.query;






    if (req.method == "GET") {
        try {
            if (!isValidObjectId(courseId)) return res.status(422).json({ message: `id is not valid` });
            const course = await courseModel.findOne({ _id: courseId })

            if (course) {
                return res.json({ course: course });
            } else {
                return res.status(404).json({ message: "course not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }





    else if (req.method == "PUT") {
        try {
            const { courseName, coursePrice, courseTeacherName, courseImage } = req.body;
           
            if (
                courseName.trim().length < 2 ||
                coursePrice<100000 ||
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

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
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
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }











}


export default handler;
