// src/models/Reservas.ts

export interface Reservas {
    IDReserva: string;
    Plataforma: string;
    IDCliente: string;
    IDAlojamento: string;
    NumHospedes: number;
    CheckIn: Date;
    CheckOut: Date;
    Valor: number;
    Notas: string;
    Status: string;
  }
  