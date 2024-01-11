import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';

import './Alojamentos.scss';

const Alojamentos = () => {
  const [properties, setProperties] = useState<DocumentData[]>([]);
  const [filter, setFilter] = useState<string>('');
  const history = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'alojamentos'));
      setProperties(querySnapshot.docs.map(doc => {
        const data = doc.data() as DocumentData;
        // Adapte os campos abaixo conforme a nova estrutura da sua base de dados
        return {
          IDAlojamento: data.IDAlojamento,
          Nome: data.Nome,
          Morada: data.Morada,
          Descrição: data.Descrição,
          Quartos: data.Quartos,
          Camas: data.Camas,
          MaxHospedes: data.MaxHospedes,
          CasasBanho: data.CasasBanho,
          PreçoVerao: data.PreçoVerao,
          PrecoInverno: data.PrecoInverno,
          Comodidades: data.Comodidades,
          Regras: data.Regras,
          Notas: data.Notas,
          Fotos: data.Fotos,
          TempoLimpeza: data.TempoLimpeza,
          Plataformas: data.Plataformas,
          Tipo: data.Tipo,
          PoliticaCancelamento: data.PoliticaCancelamento,
          Fumador: data.Fumador,
          Status: data.Status
        };
      }));
    };

    fetchProperties();
  }, []);

  const handlePropertyClick = (propertyId: string) => { 
    history(`/alojamentos/${propertyId}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1 className="custom-page-title">Gestão de Alojamentos</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar por nome, descrição ou morada"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="alojamentos-grid">
        {properties
          .filter(property => {
            const searchValue = filter.toLowerCase();
            return (
              property.Nome.toLowerCase().includes(searchValue) ||
              property.Descrição.toLowerCase().includes(searchValue) ||
              property.Morada.toLowerCase().includes(searchValue)
            );
          })
          .map(property => (
            <div key={property.IDAlojamento} className="property-card" onClick={() => handlePropertyClick(property.IDAlojamento)}>
              <img src={property.Fotos} alt={property.Nome} />
              <div className="property-info">
                <h3>{property.Nome}</h3>
                <p>{property.Morada}</p>
                {/* Adicione mais informações aqui conforme necessário */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alojamentos;
