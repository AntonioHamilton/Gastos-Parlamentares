import { NextApiResponse, NextApiRequest } from "next";
import { getTotalBillsByPartyByYear } from "../../../backend/controllers/ctrTotalBills"
import dbConnect from "@/backend/dbConnection";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, page, size } = req.query;

  await dbConnect()

  if (req.method === "GET") {
    try {
      if (!Number(year)) {
        res.status(400).json({ error: "O ano deve ser um número" }); 
      }

      if (Number(year) < 2016 || Number(year) > 2020) {
        res.status(400).json({ error: "Tente novamente com uma data entre 2016 e 2020" }); 
      }

      const totalBills = await getTotalBillsByPartyByYear(String(year), Number(page), Number(size));
      res.status(200).json(totalBills);
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};