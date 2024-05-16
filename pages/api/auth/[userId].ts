


import connectToDB from "../../../utils/db";
import userModel from '../../../models/users'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";
import userValidate from "@/validator/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { userId } = req?.query;
    
    if (req.method == "GET") {
        try {
            if (!isValidObjectId(userId)) return res.status(422).json({ message: `id is not valid` });
            const user = await userModel.findOne({ _id: userId })

            if (user) {
                return res.json({ user: user });
            } else {
                return res.status(404).json({ message: "user not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }

    else if (req.method == "PUT") {
        try {
            const { firstName, lastName, userName, email, password, userImage, role } = req.body;
   
            const resultValidation = userValidate(req.body)

            if (resultValidation !== true) return res.status(422).json(resultValidation);

            const isUser = await userModel.findOne({ _id: userId })
            if (!isUser)
                return res.status(404).json({ message: `user not found with id=${userId}` });



            const updateUser = await userModel.findOneAndUpdate({ _id: userId }, { firstName, lastName, userName, email, password, userImage, role })


            if (updateUser) return res.status(200).json({ message: `update user with id=${userId}` });

            return res
                .status(501)
                .json({ message: `error update user with id=${userId}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
            if (!isValidObjectId(userId)) return res.status(422).json({ message: `id is not valid` });

            const isUser = await userModel.findOne({ _id: userId })
            if (!isUser) return res.status(404).json({ message: `user not found with id=${userId}` });


            const DeleteUser = await userModel.findOneAndDelete({ _id: userId })
            if (!DeleteUser) return res.status(501).json({ message: `error delete user with id=${userId}` });

            return res.status(200).json({ message: `delete user with id=${userId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
