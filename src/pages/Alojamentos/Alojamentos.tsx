import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Alojamentos as AlojamentosModel } from '../../models/Alojamentos';

import './Alojamentos.scss';

const Alojamentos = () => {
  const [properties, setProperties] = useState<AlojamentosModel[]>([]);
  const [filter, setFilter] = useState<string>('');
  const history = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'alojamentos'));
      const alojamentosData: AlojamentosModel[] = querySnapshot.docs.map(doc => doc.data() as AlojamentosModel);
      setProperties(alojamentosData);
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
              <img src={property.Fotos[0]} alt={property.Nome} />
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
