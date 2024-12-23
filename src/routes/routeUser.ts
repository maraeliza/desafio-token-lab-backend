import { Router, Request, Response } from "express";
import User from "../user/userModel";
import UserRepository from "../user/userRepository";

const { isValidJWT } = require("../validation/validate");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = Router();
const envPath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const SECRET = process.env.SECRET_KEY_JWT;



router.get("/", isValidJWT, (req: Request, res: Response) => {
  res.send("Listando todos os usuários");

});

router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;
  try {

    var usuario = new User(user);
    var userRegistered = await usuario.register();

    if (userRegistered) {
      return res.status(201).json({ message: "Usuário criado", user });
    } else {
      return res
        .status(400)
        .json({ message: "Não foi possível criar usuário" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const user = req.body;

  try {
    var userAuth = {
      senha: user.senha,
      email: user.email
    };
    const userAutenticado = await User.authUser(userAuth);

    if (!userAutenticado) {
      return res
        .status(401)
        .json({ auth: false, message: "Senha ou CPF inválido" });
    }

    //se sim, pegar o id do usuário
    const id = await UserRepository.selectIDFromUser(user.email);

    try {
      //enviar o token para o front-end
      const token = await jwt.sign({ userId: id }, SECRET, {
        expiresIn: 30000,
      });
      if (token) {
        return res.status(200).json({ auth: true, token, userId:id });
      } else {
        return res
          .status(500)
          .json({ auth: false, message: "Erro ao gerar token" });
      }
    } catch (erro) {
      return res
        .status(500)
        .json({ auth: false, message: "Erro ao gerar token" });
    }
  } catch (erro) {
    console.log(erro);
    return res.status(401).json({ auth: false, message: "Dados inválidos" });
  }
});

export default router;
