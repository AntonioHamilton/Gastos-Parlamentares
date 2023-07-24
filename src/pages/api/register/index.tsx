import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { register } from "@/backend/controllers/ctrAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  await dbConnect()

  if (req.method === "GET") {
    try {
      if (!name || !email || !password) {
        res.status(400).json({ error: "Preencha todos os dados para fazer o cadastro" }); 
      }

      const billsTypes = await register({name, email, password});
      res.status(201).json(billsTypes);
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};