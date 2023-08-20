import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { getLocation, setLocation } from "@/backend/controllers/ctrLocation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.headers;

  await dbConnect()

  if (req.method === "POST") {
    const { latitude, longitude } = req.body;
    try {
      if (!token) {
        return res.status(401).json({ error: "É necessário ter um token para completar a ação" }); 
      }

      if (!latitude || !longitude) {
        return res.status(403).json({ error: "Localização inválida" }); 
      }

      const {error, status} = await setLocation({token: String(token), latitude, longitude});

      if (error) {
        return res.status(status).json({error})
      }

      res.status(status).json({})
    } catch (e) {
      console.log({e})
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  if (req.method === "GET") {
    try {
      if (!token) {
        return res.status(401).json({ error: "É necessário ter um token para completar a ação" }); 
      }

      const {error, status, result} = await getLocation({token: String(token)});

      if (error) {
        return res.status(status).json({error})
      }

      res.status(status).json({result})
    } catch (e) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};