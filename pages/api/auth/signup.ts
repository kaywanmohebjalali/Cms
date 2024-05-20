import { NextApiRequest, NextApiResponse } from "next";

import connectToDB from "../../../utils/db";
import userModel from '../../../models/users'
import userValidate from "@/validator/user";


async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDB();


  if (req.method != 'POST') {
    return false
  }

  try {
    const { firstName, lastName, userName, email, password, userImage = '' } = req.body;



  // validation 
    const resultValidation = userValidate(req.body)
    if (resultValidation !== true) return res.status(422).json(resultValidation);



    // exist user check
    const isUserExist = await userModel.findOne({$or:[ {userName},{ email }]})
    if (isUserExist) return res.status(409).json({ message: "this username or email exist already" });



    const user = await userModel.create({ firstName, lastName, userName, email, password, userImage, role:'admin' })


    if (user) return res.status(201).json({ message: "create new user", user: user });


    return res.status(500).json({ message: "error create new user in server" });

  } catch (error) {


    return res.status(500).json({ message: error });

  }


}

export default handler;
