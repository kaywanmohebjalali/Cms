


import connectToDB from "../../../utils/db";
import commentModel from '../../../models/Comments'

import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {

    connectToDB()
    const { commentId } = req?.query;


    if (req.method == "GET") {
        try {
            if (!isValidObjectId(commentId)) return res.status(422).json({ message: `id is not valid` });
            const comment = await commentModel.findOne({ _id: commentId })

            if (comment) {
                return res.json({ comment: comment });
            } else {
                return res.status(404).json({ message: "comment not found" });
            }
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }





    else if (req.method == "PUT") {
        try {
            const { title, courseId } = req.body;
           
            if (
                title.trim().length < 2 ||
                !courseId
                
            ) {
                return res.status(422).json({ message: "data not valid" });
            }

            const isComment = await commentModel.findOne({ _id: commentId })
            if (!isComment)
                return res.status(404).json({ message: `comment not found with id=${commentId}` });



            const updateComment = await commentModel.findOneAndUpdate({ _id: commentId }, {  title, courseId})


            if (updateComment) return res.status(200).json({ message: `update comment with id=${commentId}` });

            return res
                .status(501)
                .json({ message: `error update comment with id=${commentId}` });

        } catch (error) {
            return res.status(500).json({ message: error });

        }

    }







    else if (req.method == "DELETE") {

        try {
            if (!isValidObjectId(commentId)) return res.status(422).json({ message: `id is not valid` });

            const isComment = await commentModel.findOne({ _id: commentId })
            if (!isComment) return res.status(404).json({ message: `comment not found with id=${commentId}` });


            const DeletedCourse = await commentModel.findOneAndDelete({ _id: commentId })
            if (!DeletedCourse) return res.status(501).json({ message: `error delete comment with id=${commentId}` });
            
            return res.status(200).json({ message: `delete comment with id=${commentId}` });
        } catch (error) {
            return res.status(500).json({ message: error });

        }
    }



}


export default handler;
