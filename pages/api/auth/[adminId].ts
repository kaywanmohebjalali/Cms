


import connectToDB from "../../../utils/db";
import adminModel from '../../../models/users'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { adminId } = req?.query;

if (req.method == "DELETE") {
    console.log('adminId : ',adminId);
        try {
            if (!isValidObjectId(adminId)) return res.status(422).json({ message: `id is not valid` });

            const isCourse = await adminModel.findOne({ _id: adminId })
            if (!isCourse) return res.status(404).json({ message: `admin not found with id=${adminId}` });


            const DeletedCourse = await adminModel.findOneAndDelete({ _id: adminId })
            if (!DeletedCourse) return res.status(501).json({ message: `error delete admin with id=${adminId}` });

            return res.status(200).json({ message: `delete admin with id=${adminId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
