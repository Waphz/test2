import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import db from '../../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Alojamentos as AlojamentosModel } from '../../../models/Alojamentos';
import { Reviews as ReviewsModel } from '../../../models/Reviews';
import { Clientes as ClientesModel } from '../../../models/Clientes';
import { Comodidades as ComodidadesModel } from '../../../models/Comodidades';
import { TiposAlojamento as TiposAlojamentoModel } from '../../../models/TiposAlojamento';
import { Plataformas as PlataformasModel } from '../../../models/Plataformas';

import './DetalhesAlojamento.scss';

interface ReviewComCliente extends ReviewsModel {
  ClienteNome?: string;
  DiasDesdeReview?: number;
}

interface ComodidadesMap {
  [key: string]: string;
}

interface TiposAlojamentoMap {
  [key: string]: string;
}

interface PlataformasMap {
  [key: string]: PlataformasModel;
}

const DetalhesAlojamento = () => {
  const [alojamento, setAlojamento] = useState<AlojamentosModel | null>(null);
  const [imagemPrincipal, setImagemPrincipal] = useState('');
  const [reviews, setReviews] = useState<ReviewComCliente[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async (clientesIds: string[]): Promise<ClientesModel[]> => {
      const clientesPromises = clientesIds.map(id => getDoc(doc(db, 'clientes', id)));
      const clientesDocs = await Promise.all(clientesPromises);
      return clientesDocs.map(doc => doc.data() as ClientesModel);
    };

    const fetchReviews = async (alojamentoId: string) => {
      // Buscar reservas associadas ao alojamento
      const reservasQuery = query(collection(db, 'reservas'), where('IDAlojamento', '==', alojamentoId));
      const reservasSnapshot = await getDocs(reservasQuery);
      const reservasIds = reservasSnapshot.docs.map(doc => doc.id);

      // Buscar reviews baseadas nas reservas obtidas
      if (reservasIds.length > 0) {
        const reviewsQuery = query(collection(db, 'reviews'), where('IDReserva', 'in', reservasIds));
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsData = reviewsSnapshot.docs.map(doc => ({ ...doc.data(), IDReview: doc.id }) as ReviewsModel);

        // Buscar informações dos clientes associados às reviews
        const clientes = await fetchClientes(reviewsData.map(r => r.IDCliente));
        const reviewsComClientes = reviewsData.map(review => {
          const cliente = clientes.find(c => c.IDCliente === review.IDCliente);
          const reviewDate = review.Data.toDate(); // Convertendo Timestamp para Date
          const diasDesdeReview = Math.floor((new Date().getTime() - reviewDate.getTime()) / (1000 * 3600 * 24));
          return {
            ...review,
            ClienteNome: cliente ? cliente.Nome : '',
            DiasDesdeReview: diasDesdeReview || 0
          };
        });

        setReviews(reviewsComClientes);
      }
    };

    const fetchInformacoesAdicionais = async (alojamentoData: AlojamentosModel) => {
      const comodidadesSnapshot = await getDocs(collection(db, 'comodidades'));
      const comodidadesMap = comodidadesSnapshot.docs.reduce((acc: ComodidadesMap, doc) => {
        const data = doc.data() as ComodidadesModel;
        acc[data.IDComodidade] = data.Nome;
        return acc;
      }, {} as ComodidadesMap);

      const tiposAlojamentoSnapshot = await getDocs(collection(db, 'tiposAlojamento'));
      const tiposAlojamentoMap = tiposAlojamentoSnapshot.docs.reduce((acc: TiposAlojamentoMap, doc) => {
        const data = doc.data() as TiposAlojamentoModel;
        acc[data.IDTipoAlojamento] = data.Descrição;
        return acc;
      }, {} as TiposAlojamentoMap);

      const plataformasSnapshot = await getDocs(collection(db, 'plataformas'));
      const plataformasMap = plataformasSnapshot.docs.reduce((acc: PlataformasMap, doc) => {
        const data = doc.data() as PlataformasModel;
        acc[doc.id] = data;
        return acc;
      }, {} as PlataformasMap);

      setAlojamento({
        ...alojamentoData,
        Comodidades: alojamentoData.Comodidades.map(id => comodidadesMap[id]).filter(Boolean),
        Tipo: tiposAlojamentoMap[alojamentoData.Tipo] || alojamentoData.Tipo,
        Plataformas: alojamentoData.Plataformas.map(id => plataformasMap[id]?.Nome).filter(Boolean)
      });
    };

    const fetchAlojamento = async () => {
      if (id) {
        const docRef = doc(db, 'alojamentos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as AlojamentosModel;
          setImagemPrincipal(data.Fotos[0]);
          fetchReviews(id);
          await fetchInformacoesAdicionais(data);
        } else {
          console.log('Nenhum alojamento encontrado!');
        }
      }
    };

    fetchAlojamento();
  }, [id]);


  const handleReviewClick = (reviewId: string) => () => {
    navigate('/'); // Altere conforme necessário
  };

  if (!id || !alojamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="detalhes-alojamento">
      <button onClick={() => navigate(-1)} className="botao-voltar">Voltar</button>
      <div className="foto-e-info">
        <div className="galeria-alojamento">
          <img src={imagemPrincipal} alt={alojamento.Nome} className="foto-alojamento" />
          <div className="miniaturas">
            {alojamento.Fotos.map((foto, index) => (
              <img key={index} src={foto} alt={`Miniatura ${index + 1}`} onClick={() => setImagemPrincipal(foto)} style={{ width: '80px', margin: '0 10px 10px 0', cursor: 'pointer' }} />

              ))}
              </div>
            </div>
            <div className="info-alojamento">
              <h1 className="custom-page-title">{alojamento.Nome}</h1>
              <div className="reviews-container">
                {reviews.map(review => (
                  <button 
                    key={review.IDReview} 
                    className="review-summary" 
                    onClick={handleReviewClick(review.IDReview)}
                  >
                    <span>
                      {review.ClienteNome} - "{review.Comentário.substring(0, 20)}..." - 
                      Rat: {review.Rating} 
                      ({review.DiasDesdeReview !== undefined ? (review.DiasDesdeReview < 7 ? `${review.DiasDesdeReview}d` : `${Math.floor(review.DiasDesdeReview / 7)}w`) : 'N/A'})
                    </span>
                  </button>
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
            <button onClick={() => navigate(`/editar-alojamento/${id}`)} className="botao-editar">Editar</button>
          </div>
        </div>
  );
};

export default DetalhesAlojamento;        