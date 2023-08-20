import { getAllLocations } from "@/backend/controllers/ctrLocation";
import dbConnect from "@/backend/dbConnection";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.headers;

  await dbConnect()

  if (req.method === "GET") {
    try {
      if (!token) {
        return res.status(401).json({ error: "É necessário ter um token para completar a ação" }); 
      }

      const {error, status, result} = await getAllLocations({token: String(token)});

      if (error) {
        return res.status(status).json({error})
      }

      res.status(status).json({result})
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}