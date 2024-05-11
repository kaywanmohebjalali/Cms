import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import teacherModel from '../../../models/teachers'


async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDB();


  switch (req.method) {
    case "GET":
      try {

        const query = req?.query
        let teachers: any

        if (Object.keys(query).length) {

          teachers = await teacherModel.find({ courseName: { $regex: query?.filter } });

        } else {

          teachers = await teacherModel.find()
        }
        return res.json(teachers);
      } catch (error) {
        return res.status(500).json({ message: error });

      }



    case "POST":
      try {
        const { fullName, email, password, teacherImage } = req.body;
        
        if (
          fullName.trim()?.length < 2 ||
          !email
          ||password.trim()?.length < 5
          ||!teacherImage
        ) {
          return res.status(422).json({ message: "data not valid" });
        }

        const checkCourse = await teacherModel.findOne({ fullName: fullName })

        if (checkCourse) return res.status(409).json({ message: "There is a teacher on the database" });



        const teacher = await teacherModel.create({ fullName, email, password ,teacherImage})

        if (teacher) return res.status(201).json({ message: "create new teacher", teacher: teacher });


        return res.status(500).json({ message: "error create new teacher" });

      } catch (error) {
        return res.status(500).json({ message: error });

      }

    default:
      return res.json({ message: "teacher" });
  }
}

export default handler;
