import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Alojamentos as AlojamentosModel } from '../../../models/Alojamentos';
import { Reviews as ReviewsModel } from '../../../models/Reviews';

import './DetalhesAlojamento.scss';

const DetalhesAlojamento = () => {
  const [alojamento, setAlojamento] = useState<AlojamentosModel | null>(null);
  const [reviews, setReviews] = useState<ReviewsModel[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlojamento = async () => {
      if (id) {
        const docRef = doc(db, 'alojamentos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAlojamento(docSnap.data() as AlojamentosModel);
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

  const handleEditClick = () => {
    navigate(`/editar-alojamento/${id}`);
  };

  if (!id || !alojamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="detalhes-alojamento">
      <div className="foto-e-info">
        <img src={alojamento.Fotos[0]} alt={alojamento.Nome} className="foto-alojamento" />
        <div className="info-alojamento">
          <h1>{alojamento.Nome}</h1>
          <div className="reviews">
            {reviews.map(review => (
              <p key={review.IDReview}>{review.Comentário}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="caracteristicas-alojamento">
        <p>Morada: {alojamento.Morada}</p>
        <p>Descrição: {alojamento.Descrição}</p>
        {/* Adicione aqui outras características do alojamento */}
        <button onClick={handleEditClick} className="botao-editar">Editar</button>
      </div>
    </div>
  );
};

export default DetalhesAlojamento;
