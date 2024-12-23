import { Router, Request, Response } from "express";
import EventRepository from "../event/EventRepository";
import Evento from "../event/Event";

const { isValidJWT } = require("../validation/validate");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = Router();
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const SECRET = process.env.SECRET_KEY_JWT;

router.get("/", isValidJWT, (req: Request, res: Response) => {
  res.send("Listando todos os eventos");
  console.log(req.body);
});

router.post(
  "/getByIdUser",
  isValidJWT,
  async (req: Request, res: Response): Promise<any> => {
    var userId = req.body.userId;
    const eventos = await new EventRepository().selectEventsByUserId(userId);

    if (eventos.length > 0) {
      return res
        .status(201)
        .json({ message: "Requisição feita com sucesso", eventos });
    } else if(eventos.length === 0){
        return res
        .status(201)
        .json({ message: "Eventos não encontrados para esse usuário" });
    }else{
        return res
        .status(400)
        .json({ message: "Não foi possível realizar a requisição" });
    }
  }
);
router.post(
  "/add",
  isValidJWT,
  async (req: Request, res: Response): Promise<any> => {
    const { title, desc, start, end, color, userId } = req.body;

    if (!start || !end || !userId || !desc) {
      return res.status(400).json({
        message:
          "Erro: data de início, fim e descrição são obrigatórios e não podem ser nulos.",
      });
    }
    const evento = new Evento();
    evento.setValues(title, desc, start, end, color || "#000000", userId);
    try {
      const eR = new EventRepository();
      const eventoInserido = await eR.insertEvent(evento);

      if (eventoInserido) {
        return res.status(201).json({
          message: "Requisição feita com sucesso",
          evento: eventoInserido,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Não foi possível acessar os eventos" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao inserir evento", error });
    }
  }
);

export default router;
