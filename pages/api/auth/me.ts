


import connectToDB from "../../../utils/db";
import adminModel from '../../../models/users'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";
import adminValidate from "@/validator/admin";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { adminId } = req?.query;


    if (req.method == "GET") {
        try {
            if (!isValidObjectId(adminId)) return res.status(422).json({ message: `id is not valid` });
            const admin = await adminModel.findOne({ _id: adminId })

            if (admin) {
                return res.json({ admin: admin });
            } else {
                return res.status(404).json({ message: "admin not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }


}


export default handler;
