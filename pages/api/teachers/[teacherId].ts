


import connectToDB from "../../../utils/db";
import teacherModel from '../../../models/teachers'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { teacherId } = req?.query;


    if (req.method == "GET") {
        try {
            if (!isValidObjectId(teacherId)) return res.status(422).json({ message: `id is not valid` });
            const teacher = await teacherModel.findOne({ _id: teacherId })

            if (teacher) {
                return res.json({ teacher: teacher });
            } else {
                return res.status(404).json({ message: "teacher not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }





    else if (req.method == "PUT") {
        try {
            const { fullName,email,password, teacherImage } = req.body;
           
            if (
                fullName.trim()?.length < 2 ||
                !email
                || password.trim()?.length < 5
            ) {
                return res.status(422).json({ message: "data not valid" });
            }

            const isTeacher = await teacherModel.findOne({ _id: teacherId })
            if (!isTeacher)
                return res.status(404).json({ message: `teacher not found with id=${teacherId}` });



            const updateTeacher = await teacherModel.findOneAndUpdate({ _id: teacherId }, { fullName,email,password, teacherImage })


            if (updateTeacher) return res.status(200).json({ message: `update teacher with id=${teacherId}` });

            return res
                .status(501)
                .json({ message: `error update teacher with id=${teacherId}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
            if (!isValidObjectId(teacherId)) return res.status(422).json({ message: `id is not valid` });

            const isTeacher = await teacherModel.findOne({ _id: teacherId })
            if (!isTeacher) return res.status(404).json({ message: `teacher not found with id=${teacherId}` });


            const DeletedTeacher = await teacherModel.findOneAndDelete({ _id: teacherId })
            if (!DeletedTeacher) return res.status(501).json({ message: `error delete teacher with id=${teacherId}` });
            
            return res.status(200).json({ message: `delete teacher with id=${teacherId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
