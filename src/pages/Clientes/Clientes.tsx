import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import {
  collection,
  getDocs,
  query,
} from 'firebase/firestore';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import TextBox from 'devextreme-react/text-box';
import SelectBox from 'devextreme-react/select-box';
import './Clientes.scss';

interface Cliente {
  UserID: string;
  Name: string;
  Email: string;
  Phone: string;
  // Adicione mais campos conforme necessário
}

interface Review {
  UserID: string;
  Rating: number;
  Comment: string;
  // Adicione mais campos conforme necessário
}

const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filtro, setFiltro] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedReviewType, setSelectedReviewType] = useState<string>('Ambas');

  useEffect(() => {
    const fetchClientes = async () => {
      const clientesQuery = query(collection(db, 'users'));
      const querySnapshot = await getDocs(clientesQuery);
      const clientesData = querySnapshot.docs.map((doc) => doc.data() as Cliente);
      setClientes(clientesData);
    };

    const fetchReviews = async () => {
      const reviewsQuery = query(collection(db, 'reviews'));
      const querySnapshot = await getDocs(reviewsQuery);
      const reviewsData = querySnapshot.docs.map((doc) => doc.data() as Review);
      setReviews(reviewsData);
    };

    fetchClientes();
    fetchReviews();
  }, []);

  const renderEditButton = (cellData: any) => {
    return (
      <button onClick={() => console.log(`Editar cliente: ${cellData.data.UserID}`)}>
        Editar
      </button>
    );
  };

  return (
    <div className="clientes-avaliacoes-container">
      <h1 className="custom-page-title">Clientes e Avaliações</h1>

      <div className="notification-boxes">
        <div className="avaliacoes-positivas">
          <h2>Avaliações Positivas</h2>
          <ul>
            {reviews
              .filter((review) => review.Rating >= 3)
              .slice(0, 5)
              .map((avaliacao, index) => (
                <li key={index}>
                  <span>Comentário: {avaliacao.Comment}</span>
                </li>
              ))}
          </ul>
        </div>
        <div className="avaliacoes-negativas">
          <h2>Avaliações Negativas</h2>
          <ul>
            {reviews
              .filter((review) => review.Rating <= 2)
              .slice(0, 5)
              .map((avaliacao, index) => (
                <li key={index}>
                  <span>Comentário: {avaliacao.Comment}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="filtro-cliente">
        <TextBox
          value={filtro}
          onValueChanged={(e) => setFiltro(e.value)}
          placeholder="Filtrar Clientes"
        />
        <SelectBox
          dataSource={['Positivas', 'Negativas', 'Ambas']}
          value={selectedReviewType}
          onValueChanged={(e) => setSelectedReviewType(e.value)}
          placeholder="Filtrar Avaliações"
        />
        <SelectBox
          dataSource={clientes.map((cliente) => cliente.Name)}
          value={selectedUser}
          onValueChanged={(e) => setSelectedUser(e.value)}
          placeholder="Selecionar Cliente"
        />
      </div>

      {selectedUser && (
        <div className="reviews-cliente">
          <h2>Reviews do Cliente</h2>
          <ul>
            {reviews
              .filter((review) => {
                if (selectedReviewType === 'Positivas') {
                  return review.Rating >= 3;
                } else if (selectedReviewType === 'Negativas') {
                  return review.Rating <= 2;
                } else {
                  return true;
                }
              })
              .map((avaliacao, index) => (
                <li key={index}>
                  <span>Comentário: {avaliacao.Comment}</span>
                </li>
              ))}
          </ul>
          {/* Botões para selecionar intervalo de datas (place holder) */}
          <div className="date-filter">
            <button>Últimos 7 dias</button>
            <button>Últimos 30 dias</button>
            <button>Últimos 90 dias</button>
            <button>Desde sempre</button>
          </div>
        </div>
      )}

      <DataGrid dataSource={clientes}>
        <Column dataField="Name" caption="Nome do Cliente" />
        <Column caption="Ação" cellRender={renderEditButton} />
      </DataGrid>
    </div>
  );
};

export default Clientes;
