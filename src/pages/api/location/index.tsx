import { NextApiResponse, NextApiRequest } from "next";
import dbConnect from "@/backend/dbConnection";
import { getLocation, setLocation } from "@/backend/controllers/ctrLocation";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.headers;

  await dbConnect()

  if (req.method === "PATCH") {
    const { latitude, longitude } = req.body;
    try {

      if (!token) {
        res.status(401).redirect('/login').json({ error: 'Você não tem acesso!'});; 
      }

      if (!latitude || !longitude) {
        res.status(403).json({ error: "Localização inválida" }); 
      }

      const {error, status} = await setLocation({token: String(token), latitude, longitude});

      if (error) {
        res.status(status).json({error})
      }

      res.status(status).json({message: 'ApiResponse'})
    } catch (e) {
      console.log({e})
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  if (req.method === "GET") {
    try {
      if (!token) {
        res.status(401).redirect('/login').json({ error: 'Você não tem acesso!'}); 
      }

      const {error, status, result} = await getLocation({token: String(token)});

      if (error) {
        res.status(status).json({error})
      }

      res.status(status).json({result})
    } catch (e) {
      console.log({e})
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};