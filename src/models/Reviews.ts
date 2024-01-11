// src/models/Reviews.ts

export interface Reviews {
    IDReview: string;
    Data: Date;
    IDReserva: string;
    IDCliente: string;
    Rating: number;
    Comentário: string;
    Plataformas: string[];
    Status: string;
  }
  