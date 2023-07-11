import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import getCampaignSpendingByPolitician from "@/backend/controllers/ctrCampaignByCongressman";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, page, size, month, description } = req.query;

  await dbConnect()

  if (req.method === "GET") {
    try {
      if (!Number(year)) {
        res.status(400).json({ error: "O ano deve ser um número" }); 
      }

      if (Number(year) < 2016 || Number(year) > 2020) {
        res.status(400).json({ error: "Tente novamente com uma data entre 2016 e 2020" }); 
      }

      const billsTypes = await getCampaignSpendingByPolitician(Number(year), Number(page), Number(size), Number(month), String(description));
      res.status(200).json(billsTypes);
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};