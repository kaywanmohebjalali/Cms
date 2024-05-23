


import connectToDB from "../../../utils/db";

import { NextApiRequest, NextApiResponse } from "next";

import { verifyToken } from "@/utils/auth";
import { serialize } from "cookie";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDB()
    const { token } = req?.cookies
    const tokenPayload = verifyToken(token)
    const { email } = tokenPayload as { email: string }
    if (req.method == "GET") {
        try {


 return res.status(200).setHeader('Set-Cookie',serialize('token','',{
    path:'/',
    maxAge:0
 })).json({ message: "user not login" })
              

        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }


   









}


export default handler;
