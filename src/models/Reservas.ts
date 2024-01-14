// src/models/Reservas.ts

import { Timestamp } from 'firebase/firestore';

export interface Reservas {
    IDReserva: string;
    Plataforma: string;
    IDCliente: string;
    IDAlojamento: string;
    NumHospedes: number;
    CheckIn: Timestamp;
    CheckOut: Timestamp;
    Valor: number;
    Notas: string;
    Status: string;
  }
  