const validate = require("../validation/validate");
import UserRepository, { UserRepositoryInterface } from "./userRepository";

export type UserInterface = User;

export type UserAuth = {
  senha: string;
  email: string;
};
export default class User {
  private nome: string = "";
  private email: string = "";
  private senha: string = "";
  public repository: UserRepositoryInterface;

  constructor({ nome, email, senha }: UserInterface) {
    this.setNome(nome);   
    this.setEmail(email);
    this.setSenha(senha);
    this.repository = new UserRepository();
  }

  public static async authUser(obj: UserAuth): Promise<boolean> {
    if (
      obj == null ||
      !obj.email ||
      !obj.senha ||
      !validate.isValidEmail(String(obj.email)) ||
      !validate.isValidSenha(String(obj.senha))
    ) {
      return await false;
    }
    return await new UserRepository().findUser(obj);
  }
  async register(): Promise<boolean> {
    if (this.repository != null) {
      return await this.repository.insertUserBanco(this);
    }

    return true;
  }

  public getNome(): string {
    return this.nome;
  }

  public setNome(nome: string): void {
    if (nome.trim().length === 0) {
      throw new Error("Nome não pode ser vazio.");
    }
    this.nome = nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    if (email && !validate.isValidEmail(email)) {
      throw new Error("E-mail inválido.");
    }
    this.email = email;
  }

  public getSenha(): string {
    return this.senha;
  }

  public setSenha(senha: string): void {
    console.log(senha);
    if (senha && !validate.isValidSenha(senha)) {
      throw new Error("Senha inválida");
    }
    this.senha = senha;
  }



}
