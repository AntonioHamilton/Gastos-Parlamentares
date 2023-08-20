import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { register } from "@/backend/controllers/ctrAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, email, password } = req.body;

  await dbConnect()

  if (req.method === "POST") {
    try {
      if (name === '' || email === '' || password === '') {
        res.status(400).json({ error: "Preencha todos os dados para fazer o cadastro" }); 
      }

      const {error, status} = await register({name, email, password});

      if (error) {
        res.status(status).json({error})
      }

      res.status(status).json({status})
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};