// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "..";
import { saveItem } from "../../db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {
  const body = req.body;
  const inserted = saveItem({ name: body.name, role: body.role });
  return res.status(201).json(inserted);
}
