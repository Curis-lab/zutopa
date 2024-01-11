import { method } from "cypress/types/bluebird";
import { NextApiRequest, NextApiResponse } from "next";

//

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method){
    console.log('Posting File');
  }
  res.status(201).json({id:1, text:'file'});
}
