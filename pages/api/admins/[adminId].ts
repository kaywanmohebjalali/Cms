


import connectToDB from "../../../utils/db";
import adminModel from '../../../models/admins'

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





    else if (req.method == "PUT") {
        try {
            const { fullName, email, password, adminImage} = req.body;

            const resultValidation= adminValidate(req.body)
            
            if (resultValidation!==true) return res.status(422).json(resultValidation);
            
            const isAdmin = await adminModel.findOne({ _id: adminId })
            if (!isAdmin)
                return res.status(404).json({ message: `admin not found with id=${adminId}` });



            const updateAdmin = await adminModel.findOneAndUpdate({ _id: adminId }, { fullName, email, password, adminImage })


            if (updateAdmin) return res.status(200).json({ message: `update admin with id=${adminId}` });

            return res
                .status(501)
                .json({ message: `error update admin with id=${adminId}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
            if (!isValidObjectId(adminId)) return res.status(422).json({ message: `id is not valid` });

            const isAdmin = await adminModel.findOne({ _id: adminId })
            if (!isAdmin) return res.status(404).json({ message: `admin not found with id=${adminId}` });


            const DeletedAdmin = await adminModel.findOneAndDelete({ _id: adminId })
            if (!DeletedAdmin) return res.status(501).json({ message: `error delete admin with id=${adminId}` });

            return res.status(200).json({ message: `delete admin with id=${adminId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
