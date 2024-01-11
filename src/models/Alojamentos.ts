// src/models/Alojamentos.ts

export interface Alojamentos {
    IDAlojamento: string;
    Nome: string;
    Morada: string;
    Descrição: string;
    Quartos: number;
    Camas: number;
    MaxHospedes: number;
    CasasBanho: number;
    PreçoVerao: number;
    PrecoInverno: number;
    Comodidades: string[];
    Regras: string;
    Notas: string;
    Fotos: string[];
    TempoLimpeza: number;
    Plataformas: string[];
    Tipo: string;
    PoliticaCancelamento: string;
    Fumador: boolean;
    Status: string;
  }
  