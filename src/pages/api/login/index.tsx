import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { login, register } from "@/backend/controllers/ctrAuth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  await dbConnect()

  if (req.method === "POST") {

    try {
      if (email == '' || password == '') {
        return res.status(400).json({ error: "Preencha todos os dados" }); 
      }

      const {error, result} = await login({email, password});

      if (error) {
        res.status(400).json({error})
      }

      res.status(200).json({token: result?.token})
    } catch (e) {
      console.log({e})
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};