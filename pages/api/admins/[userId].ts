


import connectToDB from "../../../utils/db";
import adminModel from '../../../models/users'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";
import userValidate from "@/validator/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { userId } = req?.query;


    if (req.method == "GET") {
        try {
            if (!isValidObjectId(userId)) return res.status(422).json({ message: `id is not valid` });
            const admin = await adminModel.findOne({ _id: userId })

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
            const { firstName, lastName, userName, email, password, adminImage,role} = req.body;
            console.log('role : ',role);
            const resultValidation= userValidate(req.body)
            
            if (resultValidation!==true) return res.status(422).json(resultValidation);
            
            const isAdmin = await adminModel.findOne({ _id: userId })
            if (!isAdmin)
                return res.status(404).json({ message: `admin not found with id=${userId}` });



            const updateAdmin = await adminModel.findOneAndUpdate({ _id: userId }, { firstName, lastName, userName, email, password, adminImage,role })


            if (updateAdmin) return res.status(200).json({ message: `update admin with id=${userId}` });

            return res
                .status(501)
                .json({ message: `error update admin with id=${userId}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
            if (!isValidObjectId(userId)) return res.status(422).json({ message: `id is not valid` });

            const isAdmin = await adminModel.findOne({ _id: userId })
            if (!isAdmin) return res.status(404).json({ message: `admin not found with id=${userId}` });


            const DeletedAdmin = await adminModel.findOneAndDelete({ _id: userId })
            if (!DeletedAdmin) return res.status(501).json({ message: `error delete admin with id=${userId}` });

            return res.status(200).json({ message: `delete admin with id=${userId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
