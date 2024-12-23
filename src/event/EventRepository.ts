import { Connection, RowDataPacket } from "mysql2/promise";
import Evento, { EventoInterface } from "./Event"; // Crie um modelo para eventos
import DB from "../infra/db";

export type EventRepositoryInterface = EventRepository;
type EventoDBInterface = {
  id: number; // id (chave primária)
  nome: string | null; // nome (pode ser nulo)
  descricao: string | null; // descricao (pode ser nulo)
  data_inicio: Date | null; // data_inicio (pode ser nulo)
  data_fim: Date | null; // data_fim (pode ser nulo)
  user_id: number; // user_id (não pode ser nulo)
  created_at: Date; // created_at (não pode ser nulo)
  cor: string; // cor (não pode ser nulo)
};
export default class EventRepository {
  private conexao: Connection | null = null;
  constructor() {
    this.inicializarConexao();
  }

  private async inicializarConexao(): Promise<void> {
    try {
      const db = new DB();
      this.conexao = await db.getConexao();
    } catch (error) {
      console.error(
        "Erro ao inicializar a conexão com o banco de dados:",
        error
      );
    }
  }

  private async getConexao(): Promise<Connection> {
    if (!this.conexao) {
      throw new Error("Conexão com o banco de dados não foi inicializada.");
    }
    return this.conexao;
  }

  async insertEvent(event: EventoInterface): Promise<boolean> {
    try {
      const query =
        "INSERT INTO tb_eventos (nome, descricao, data_inicio, data_fim, user_id, created_at, cor) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const conexao = await new DB().getConexao();
      await conexao.query(query, [
        event.title,
        event.desc,
        event.start,
        event.end,
        event.user_id,
        new Date(),
        event.color,
      ]);
      return true;
    } catch (err) {
      console.error("Erro ao inserir evento:", err);
      return false;
    }
  }

  async selectEventsByUserId(userId: number): Promise<EventoInterface[]> {
    try {

      const query = "SELECT * FROM tb_eventos WHERE user_id = ?";
      console.log("SELECIONANDO ELEMENTOS DO USUARIO "+userId);

      const conexao = await new DB().getConexao();
      console.log(query);
      const [eventosFromDB]: [RowDataPacket[], any] = await conexao.query(query, [
        userId
      ]);
     
      var listaEventos = [] as EventoInterface[];
      for (var i in Array.from(eventosFromDB)) {
        console.log(i+" " + eventosFromDB[i])
        if (
          eventosFromDB[i] != null &&
          eventosFromDB[i].data_inicio != null &&
          eventosFromDB[i].data_fim != null &&
          eventosFromDB[i].user_id != null
        ) {
          console.log("EVENTO A SER ENVIADO EM RESPOSTA: "+eventosFromDB[i])
          var evento = new Evento();
          try {
            evento.setValues(
              eventosFromDB[i].nome || "",
              eventosFromDB[i].descricao || "",
              eventosFromDB[i].data_inicio || new Date("2000-01-01"),
              eventosFromDB[i].data_fim || new Date("2000-01-01"),
              eventosFromDB[i].cor || "#000",
              eventosFromDB[i].user_id || 0
            );
            listaEventos.push(evento);
          } catch (err) {
            console.log(err);
          }
        }
      }
      console.log("_-----------------------------------------------")
      console.log(listaEventos)
      return listaEventos;
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      return [];
    }
  }

  async selectEventById(eventId: number): Promise<EventoInterface | null> {
    try {
      const query = "SELECT * FROM tb_eventos WHERE id = ?";
      const conexao = await new DB().getConexao();
      const [eventosFromDB] = await conexao.query(query, [eventId]);
      return [eventosFromDB].length > 0 ? (eventosFromDB[0] as EventoInterface) : null;
    } catch (err) {
      console.error("Erro ao buscar evento por ID:", err);
      return null;
    }
  }

  async updateEvent(eventId: number, event: EventoInterface): Promise<boolean> {
    try {
      const query =
        "UPDATE tb_eventos SET descricao = ?, data_inicio = ?, data_fim = ? WHERE id = ?";
      const conexao = await new DB().getConexao();
      await conexao.query(query, [event.desc, event.start, event.end, eventId]);
      return true;
    } catch (err) {
      console.error("Erro ao atualizar evento:", err);
      return false;
    }
  }

  async deleteEvent(eventId: number): Promise<boolean> {
    try {
      const query = "DELETE FROM tb_eventos WHERE id = ?";
      const conexao = await new DB().getConexao();
      await conexao.query(query, [eventId]);
      return true;
    } catch (err) {
      console.error("Erro ao deletar evento:", err);
      return false;
    }
  }
}
