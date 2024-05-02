import { NextApiRequest, NextApiResponse } from "next";


function handler(req:NextApiRequest, res:NextApiResponse){

    
  console.log(req?.query);

  return res.json({message:'root api'})
}

export default handler