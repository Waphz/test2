import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Alojamentos as AlojamentosModel } from '../../../models/Alojamentos';

const DetalhesAlojamento = () => {
  const [alojamento, setAlojamento] = useState<AlojamentosModel | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchAlojamento = async () => {
      if (id) { // Verifica se o ID está definido
        const docRef = doc(db, 'alojamentos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAlojamento(docSnap.data() as AlojamentosModel);
        } else {
          console.log('Nenhum alojamento encontrado!');
        }
      }
    };

    fetchAlojamento();
  }, [id]);

  if (!id) {
    return <div>ID do alojamento não fornecido.</div>;
  }

  if (!alojamento) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{alojamento.Nome}</h1>
      <p>{alojamento.Morada}</p>
      <p>{alojamento.Descrição}</p>
      {/* Renderize mais detalhes conforme necessário */}
    </div>
  );
};

export default DetalhesAlojamento;
