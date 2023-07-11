import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import getTopSpendingStatesByYear from "@/backend/controllers/ctrTopSpendingStatesByYear";
import getTopSpendingPoliticiansByStateAndYear from "@/backend/controllers/ctrTopSpendingCongressmanState";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, page, size, state } = req.query;

  await dbConnect()

  if (req.method === "GET") {
    try {
      if (!Number(year)) {
        res.status(400).json({ error: "O ano deve ser um número" }); 
      }

      if (Number(year) < 2016 || Number(year) > 2020) {
        res.status(400).json({ error: "Tente novamente com uma data entre 2016 e 2020" }); 
      }

      const billsTypes = await getTopSpendingPoliticiansByStateAndYear(Number(year), Number(page), Number(size), String(state));
      res.status(200).json(billsTypes);
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};