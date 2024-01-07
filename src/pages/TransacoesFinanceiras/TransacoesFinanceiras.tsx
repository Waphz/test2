import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import TextBox from 'devextreme-react/text-box';
import SelectBox from 'devextreme-react/select-box';
import DatePicker from 'devextreme-react/date-box';
import './TransacoesFinanceiras.scss';

interface Transacao {
  TransacaoID: string;
  DataTransacao: Date;
  Valor: number;
  Tipo: string;
  Descricao: string;
  ClienteID: string;
  CasaID: string;
}

const TransacoesFinanceiras = () => {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [filtroDataInicial, setFiltroDataInicial] = useState<Date | null>(null);
  const [filtroDataFinal, setFiltroDataFinal] = useState<Date | null>(null);
  const [filtroCliente, setFiltroCliente] = useState<string>('');
  const [filtroCasa, setFiltroCasa] = useState<string>('');
  const [quantidadeMovimentos, setQuantidadeMovimentos] = useState<number>(10);

  useEffect(() => {
    const fetchTransacoes = async () => {
      let transacoesQuery = query(collection(db, 'transacoes'), orderBy('DataTransacao'));

      if (filtroDataInicial && filtroDataFinal) {
        transacoesQuery = query(transacoesQuery, where('DataTransacao', '>=', filtroDataInicial),
          where('DataTransacao', '<=', filtroDataFinal));
      }

      if (filtroCliente) {
        transacoesQuery = query(transacoesQuery, where('ClienteID', '==', filtroCliente));
      }

      if (filtroCasa) {
        transacoesQuery = query(transacoesQuery, where('CasaID', '==', filtroCasa));
      }

      const querySnapshot = await getDocs(transacoesQuery);
      const transacoesData = querySnapshot.docs.map(doc => doc.data() as Transacao);
      setTransacoes(transacoesData.slice(0, quantidadeMovimentos));
    };

    fetchTransacoes();
  }, [filtroDataInicial, filtroDataFinal, filtroCliente, filtroCasa, quantidadeMovimentos]);

  return (
    <div className="transacoes-financeiras-container">
      <h1 className="custom-page-title">Transações Financeiras</h1>

      <div className="filtros">
        <DatePicker
          defaultValue={filtroDataInicial || undefined}
          onValueChanged={(e) => setFiltroDataInicial(e.value as Date)}
          placeholder="Data Inicial"
        />
        <DatePicker
          defaultValue={filtroDataFinal || undefined}
          onValueChanged={(e) => setFiltroDataFinal(e.value as Date)}
          placeholder="Data Final"
        />
        <TextBox
          value={filtroCliente}
          onValueChanged={(e) => setFiltroCliente(e.value as string)}
          placeholder="Cliente"
        />
        <TextBox
          value={filtroCasa}
          onValueChanged={(e) => setFiltroCasa(e.value as string)}
          placeholder="Casa"
        />
        <SelectBox
          items={[5, 10, 50, 'todos']}
          value={quantidadeMovimentos}
          onValueChanged={(e) => setQuantidadeMovimentos(e.value as number)}
          placeholder="Quantidade de Movimentos"
        />
      </div>

      <DataGrid dataSource={transacoes}>
        <Column dataField="DataTransacao" caption="Data" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="Valor" caption="Valor" dataType="number" format="currency" />
        <Column dataField="Tipo" caption="Tipo" />
        <Column dataField="Descricao" caption="Descrição" />
      </DataGrid>
    </div>
  );
};

export default TransacoesFinanceiras;
