import { NextApiRequest, NextApiResponse } from "next";


function handler(req:NextApiRequest, res:NextApiResponse){
 
  return res.json({message:'root api'})
}

export default handler