// src/models/Mensagens.ts


import { Timestamp } from 'firebase/firestore';

export interface Mensagens {
    IDMensagem: string;
    Data: Timestamp;
    Remetente: string;
    Destinatario: string;
    Mensagem: string;
    Canal: string;
    Status: string;
  }
  