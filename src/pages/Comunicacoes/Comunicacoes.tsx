import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import Autocomplete from 'devextreme-react/autocomplete';
import './Comunicacoes.scss';

interface Mensagem {
  MessageID: string;
  UserID: string;
  Text: string;
  Date: Date;
}

interface Cliente {
  UserID: string;
  Name: string;
}

const Comunicacoes = () => {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroNomeCliente, setFiltroNomeCliente] = useState<string>('');
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);

  useEffect(() => {
    const fetchMensagens = async () => {
      const mensagensQuery = query(collection(db, 'messages'), orderBy('Date', 'desc'));
      const querySnapshot = await getDocs(mensagensQuery);
      setMensagens(querySnapshot.docs.map(doc => ({ ...doc.data(), Date: doc.data().Date.toDate() }) as Mensagem));
    };
    fetchMensagens();
  }, []);

  useEffect(() => {
    const fetchClientes = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setClientes(querySnapshot.docs.map(doc => doc.data() as Cliente));
    };
    fetchClientes();
  }, []);

  const handleFiltroNomeChange = (value: string) => {
    setFiltroNomeCliente(value);
    const clienteEncontrado = clientes.find(cliente => cliente.Name.toLowerCase() === value.toLowerCase());
    setClienteSelecionado(clienteEncontrado || null);
  };

  const mensagensDoClienteSelecionado = clienteSelecionado
    ? mensagens.filter(mensagem => mensagem.UserID === clienteSelecionado.UserID)
    : [];

  return (
    <div className="comunicacoes-container">
      <h1 className="custom-page-title">Centro de Comunicações</h1>

      <div className="mensagens-recebidas">
        <h2>Últimas Mensagens Recebidas</h2>
        <DataGrid dataSource={mensagens.slice(0, 5)}>
          <Column dataField="UserID" caption="Nome do Cliente" calculateCellValue={data => {
            const cliente = clientes.find(cliente => cliente.UserID === data.UserID);
            return cliente ? cliente.Name : 'Desconhecido';
          }} />
          <Column dataField="Text" caption="Mensagem" />
          <Column dataField="Date" caption="Data" dataType="date" format="dd/MM/yyyy HH:mm" />
        </DataGrid>
      </div>

      <div className="filtro-cliente">
        <h2>Filtrar por Cliente</h2>
        <Autocomplete
          dataSource={clientes.map(cliente => cliente.Name)}
          value={filtroNomeCliente}
          onValueChanged={(e) => handleFiltroNomeChange(e.value)}
          placeholder="Nome do Cliente"
        />
      </div>

      <div className="historico-conversas">
        <h2>Histórico de Conversas</h2>
        {clienteSelecionado && (
          <DataGrid dataSource={mensagensDoClienteSelecionado}>
            <Column dataField="Text" caption="Mensagem" />
            <Column dataField="Date" caption="Data" dataType="date" format="dd/MM/yyyy HH:mm" />
          </DataGrid>
        )}
      </div>
    </div>
  );
};

export default Comunicacoes;
