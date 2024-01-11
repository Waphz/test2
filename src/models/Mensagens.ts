// src/models/Mensagens.ts

export interface Mensagens {
    IDMensagem: string;
    Data: Date;
    Remetente: string[];
    Destinatario: string[];
    Mensagem: string;
    Canal: string;
    Status: string;
  }
  