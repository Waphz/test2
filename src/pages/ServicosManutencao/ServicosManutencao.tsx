import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import './ServicosManutencao.scss';

interface Manutencao {
  ManutencaoID: string;
  PropertyID: string;
  DataServico: Date;
  TipoServico: string;
  Descricao: string;
  Status: string; // Ex: 'Pendente', 'Em progresso', 'Concluído'
}

const ServicosManutencao = () => {
  const [servicosManutencao, setServicosManutencao] = useState<Manutencao[]>([]);

  useEffect(() => {
    const fetchServicosManutencao = async () => {
      const querySnapshot = await getDocs(collection(db, 'manutencao'));
      const servicosData = querySnapshot.docs.map(doc => doc.data() as Manutencao);
      setServicosManutencao(servicosData);
    };

    fetchServicosManutencao();
  }, []);

  return (
    <div className="servicos-manutencao-container">
      <h1 className="custom-page-title">Serviços de Manutenção</h1>
      <DataGrid dataSource={servicosManutencao}>
        <Column dataField="DataServico" caption="Data do Serviço" dataType="date" format="dd/MM/yyyy" />
        <Column dataField="TipoServico" caption="Tipo de Serviço" />
        <Column dataField="Descricao" caption="Descrição" />
        <Column dataField="Status" caption="Status" />
        {/* Adicione mais colunas conforme necessário */}
      </DataGrid>
    </div>
  );
};

export default ServicosManutencao;
