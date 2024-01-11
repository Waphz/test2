import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Alojamentos as AlojamentosModel } from '../../../models/Alojamentos';
import { Reviews as ReviewsModel } from '../../../models/Reviews';

import './DetalhesAlojamento.scss';

const DetalhesAlojamento = () => {
  const [alojamento, setAlojamento] = useState<AlojamentosModel | null>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState('');
  const [reviews, setReviews] = useState<ReviewsModel[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlojamento = async () => {
      if (id) {
        const docRef = doc(db, 'alojamentos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as AlojamentosModel;
          setAlojamento(data);
          setImagemPrincipal(data.Fotos[0]);
          fetchReviews(id);
        } else {
          console.log('Nenhum alojamento encontrado!');
        }
      }
    };

    const fetchReviews = async (alojamentoId: string) => {
      const q = query(collection(db, 'reviews'), where('IDAlojamento', '==', alojamentoId));
      const querySnapshot = await getDocs(q);
      setReviews(querySnapshot.docs.map(doc => doc.data() as ReviewsModel));
    };

    fetchAlojamento();
  }, [id]);

  const handleMiniaturaClick = (foto: string) => {
    setImagemPrincipal(foto);
  };

  const handleEditClick = () => {
    navigate(`/editar-alojamento/${id}`);
  };

  if (!id || !alojamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="detalhes-alojamento">
      <div className="foto-e-info">
        <div className="galeria-alojamento">
          <img src={imagemPrincipal} alt={alojamento.Nome} className="foto-alojamento" />
          <div className="miniaturas">
            {alojamento.Fotos.map((foto, index) => (
              <img 
                key={index} 
                src={foto} 
                alt={`Miniatura ${index + 1}`} 
                onClick={() => handleMiniaturaClick(foto)}
                style={{ width: '100px', margin: '0 10px 10px 0', cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
        <div className="info-alojamento">
          <h1 className="custom-page-title">{alojamento.Nome}</h1>
          <div className="reviews">
            {reviews.map(review => (
              <div key={review.IDReview}>
                <p><strong>Nome:</strong> {review.Nome}</p>
                <p><strong>Comentário:</strong> {review.Comentário}</p>
                <p><strong>Rating:</strong> {review.Rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="caracteristicas-alojamento">
      <p>Morada: {alojamento.Morada}</p>
      <p>Descrição: {alojamento.Descrição}</p>
      <p>Quartos: {alojamento.Quartos}</p>
      <p>Camas: {alojamento.Camas}</p>
      <p>Máximo de Hóspedes: {alojamento.MaxHospedes}</p>
      <p>Casas de Banho: {alojamento.CasasBanho}</p>
      <p>Preço Verão: {alojamento.PreçoVerao}</p>
      <p>Preço Inverno: {alojamento.PrecoInverno}</p>
      <p>Comodidades: {alojamento.Comodidades.join(', ')}</p>
      <p>Regras: {alojamento.Regras}</p>
      <p>Notas: {alojamento.Notas}</p>
      <p>Tempo de Limpeza: {alojamento.TempoLimpeza}</p>
      <p>Tipo: {alojamento.Tipo}</p>
      <p>Política de Cancelamento: {alojamento.PoliticaCancelamento}</p>
      <p>Fumador: {alojamento.Fumador ? 'Sim' : 'Não'}</p>
      <p>Status: {alojamento.Status}</p>
      <button onClick={handleEditClick} className="botao-editar">Editar</button>
    </div>
    </div>
  );
};

export default DetalhesAlojamento;
