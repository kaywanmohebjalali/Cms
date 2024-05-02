
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

    const { id } = req?.query;

    if (req.method == "GET") {

        const course = await courseModel.findOne({ _id: id })

        if (course) {
            return res.json({ course: course });
        } else {
            return res.status(404).json({ message: "course not found" });
        }
    }


    

    // else if (req.method == "DELETE") {

    //     if (!isValidObjectId(id)) return res.status(422).json({ message: `id is not valid` });

    //     const iscourse = await courseModel.findOne({ _id: id })

    //     if (!iscourse)
    //         return res.status(404).json({ message: `course not found with id=${id}` });

    //     const Deletedcourse = await courseModel.findOneAndDelete({ _id: id })
    //     if (!Deletedcourse) {
    //         return res
    //             .status(501)
    //             .json({ message: `error delete course with id=${id}` });
    //     }
    //     return res.status(200).json({ message: `delete course with id=${id}` });
    // }







    // else if (req.method == "PUT") {
    //     const { name, age, password } = req.body

    //     if (name.trim().length < 2 || !String(age).trim() || password.trim().length < 5) {
    //         return res.status(422).json({ message: "data not valid" });
    //     }
    //     const iscourse = await courseModel.findOne({ _id: id })
    //     if (!iscourse)
    //         return res.status(404).json({ message: `course not found with id=${id}` });

    //     const updatecourse = await courseModel.findOneAndUpdate({ _id: id }, { name, age, password })
    //     console.log('updatecourse : ', updatecourse);

    //     if (updatecourse) return res.status(200).json({ message: `update course with id=${id}` });

    //     return res
    //         .status(501)
    //         .json({ message: `error update course with id=${id}` });


    // }




}


export default handler;
