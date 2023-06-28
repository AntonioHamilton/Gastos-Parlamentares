import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { getAllData } from "@/backend/controllers/ctrBills";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, size } = req.query;

  await dbConnect()

  if (req.method === "GET") {
    try {

      if (!Number(page) || !Number(size)) {
        res.status(400).json({ error: "O page e o size devem ser números" }); 
      }

      const totalBills = await getAllData(Number(page), Number(size));
      res.status(200).json(totalBills);
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};