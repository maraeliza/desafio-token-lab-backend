export interface EventoInterface {
  id: number;
  title: string;
  desc: string;
  start: Date;
  end: Date;
  color: string;
  user_id: number;
}

export default class Evento implements EventoInterface {
  private _id: number;
  private _title: string;
  private _desc: string;
  private _start: Date;
  private _end: Date;
  private _color: string;
  private _user_id: number;

  constructor() {}
  setValues(
    title: string,
    desc: string,
    start: Date,
    end: Date,
    color: string,
    user_id: number
  ) {
    this.title = title;
    this.desc = desc;
    this.start = start;
    this.end = end;
    this.color = color;
    this.user_id = user_id;
  }

  // Getters e Setters
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    if (value <= 0) throw new Error("ID deve ser um número positivo.");
    this._id = value;
  }

  get user_id(): number {
    return this._user_id;
  }

  set user_id(value: number) {
    if (value <= 0) throw new Error("ID deve ser um número positivo.");
    this._user_id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    if (!value || value.trim().length === 0) throw new Error("O título não pode ser vazio.");
    this._title = value;
  }

  get desc(): string {
    return this._desc;
  }

  set desc(value: string ) {
    this._desc = value;
  }

  get start(): Date {
    return this._start;
  }

  set start(value: Date) {
    if (!value) throw new Error("A data de início não pode ser vazia.");
    if (value > this._end)
      throw new Error(
        "A data de início não pode ser posterior à data de término."
      );
    this._start = value;
  }

  get end(): Date {
    return this._end;
  }

  set end(value: Date) {
    if (!value) throw new Error("A data de início não pode ser vazia.");
    if (value < this._start)
      throw new Error(
        "A data de término não pode ser anterior à data de início."
      );
    this._end = value;
  }

  get color(): string {
    return this._color;
  }

  set color(value: string) {
    if (!value) throw new Error("A cor não pode ser vazia.");
    this._color = value;
  }
}
