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
}

interface ComodidadesMap {
  [key: string]: ComodidadesModel;
}

interface TiposAlojamentoMap {
  [key: string]: TiposAlojamentoModel;
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
    const fetchAlojamento = async () => {
      if (id) {
        const docRef = doc(db, 'alojamentos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as AlojamentosModel;
          setAlojamento(data);
          setImagemPrincipal(data.Fotos[0]);
          fetchReviews(id);
          fetchInformacoesAdicionais();
        } else {
          console.log('Nenhum alojamento encontrado!');
        }
      }
    };

    const fetchClientes = async (clientesIds: string[]): Promise<ClientesModel[]> => {      const clientesPromises = clientesIds.map(id => 
        getDoc(doc(db, 'clientes', id))
      );
      const clientesDocs = await Promise.all(clientesPromises);
      return clientesDocs.map(doc => doc.data() as ClientesModel);
    };

    const fetchReviews = async (alojamentoId: string) => {
      const q = query(collection(db, 'reviews'), where('IDAlojamento', '==', alojamentoId));
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => doc.data() as ReviewsModel);
      const clientes = await fetchClientes(reviewsData.map(r => r.IDCliente));
      const reviewsComClientes = reviewsData.map(review => ({
        ...review,
        ClienteNome: clientes.find(c => c.IDCliente === review.IDCliente)?.Nome
      }));
      setReviews(reviewsComClientes);
    };

    const fetchInformacoesAdicionais = async () => {
      // Buscar comodidades
      const comodidadesSnapshot = await getDocs(collection(db, 'comodidades'));
      const comodidadesMap: ComodidadesMap = comodidadesSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data() as ComodidadesModel;
        acc[doc.id] = data;
        return acc;
      }, {} as ComodidadesMap);
    
      // Buscar tipos de alojamento
      const tiposAlojamentoSnapshot = await getDocs(collection(db, 'tiposAlojamento'));
      const tiposAlojamentoMap: TiposAlojamentoMap = tiposAlojamentoSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data() as TiposAlojamentoModel;
        acc[doc.id] = data;
        return acc;
      }, {} as TiposAlojamentoMap);
    
      // Buscar plataformas
      const plataformasSnapshot = await getDocs(collection(db, 'plataformas'));
      const plataformasMap: PlataformasMap = plataformasSnapshot.docs.reduce((acc, doc) => {
        const data = doc.data() as PlataformasModel;
        acc[doc.id] = data;
        return acc;
      }, {} as PlataformasMap);
    
      // Atualizar o estado do alojamento com as informações adicionais
      setAlojamento(prev => {
        if (prev) {
          return {
            ...prev,
            Comodidades: prev.Comodidades.map(id => comodidadesMap[id]?.Nome).filter(Boolean),
            Tipo: tiposAlojamentoMap[prev.Tipo]?.Descrição,
            Plataformas: prev.Plataformas.map(id => plataformasMap[id]?.Nome).filter(Boolean)
          };
        }
        return prev;
      });
    };

    fetchAlojamento().then(() => {
      fetchInformacoesAdicionais();
    });
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
                <p><strong>Nome:</strong> {review.ClienteNome}</p>
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
        <p>Comodidades: {alojamento.Comodidades.map(id => `#${id}`).join(', ')}</p>
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
