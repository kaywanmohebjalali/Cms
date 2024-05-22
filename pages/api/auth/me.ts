


import connectToDB from "../../../utils/db";
import userModel from '../../../models/users'

import { NextApiRequest, NextApiResponse } from "next";
import userValidate from "@/validator/user";
import { verifyToken } from "@/utils/auth";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDB()
    const { token } = req?.cookies
    const tokenPayload = verifyToken(token)
    const { email } = tokenPayload as { email: string }
    if (req.method == "GET") {
        try {


            if (!token || !tokenPayload) return res.status(401).json({ message: "user not login" })
              

            const user = await userModel.findOne({ email })

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
            const { firstName, lastName, userName, email:newEmail, password, userImage, role } = req.body;

            const resultValidation = userValidate(req.body)

            if (resultValidation !== true) return res.status(422).json(resultValidation);

            const isUser = await userModel.findOne({ email})
            if (!isUser)
                return res.status(404).json({ message: `user not found with id=${email}` });



            const updateUser = await userModel.findOneAndUpdate({ email }, { firstName, lastName, userName, email:newEmail, password, userImage, role })


            if (updateUser) return res.status(200).json({ message: `update user with id=${email}` });

            return res
                .status(501)
                .json({ message: `error update user with id=${email}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {

            const isUser = await userModel.findOne({ email })
            if (!isUser) return res.status(404).json({ message: `user not found with id=${email}` });


            const DeleteUser = await userModel.findOneAndDelete({ email })
            if (!DeleteUser) return res.status(501).json({ message: `error delete user with id=${email}` });

            return res.status(200).json({ message: `delete user with id=${email}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
