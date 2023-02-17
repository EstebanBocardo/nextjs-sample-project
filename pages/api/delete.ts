// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IUser } from "..";
import { deleteItem, saveItem } from "../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;
  const deleted = deleteItem(id);
  return res.status(200).json({ status: "OK" });
}
