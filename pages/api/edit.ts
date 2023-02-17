// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "..";
import { editItem } from "../../db";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser>
) {
  const { id, ...data } = req.body;
  const updated = editItem(id, data);
  return res.status(200).json(updated);
}
