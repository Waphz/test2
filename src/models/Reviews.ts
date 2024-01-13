// src/models/Reviews.ts

import { Timestamp } from 'firebase/firestore';

export interface Reviews {
  IDReview: string;
  Data: Timestamp; // Alterado de Date para Timestamp
  IDReserva: string;
  IDCliente: string;
  Rating: number;
  Comentário: string;
  Plataformas: string;
  Status: string;
}
