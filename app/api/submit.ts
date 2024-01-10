import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// 

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const data = req.body;
    console.log('data from handler', data);

    res.status(200).json({file:'nyan lin'})
}