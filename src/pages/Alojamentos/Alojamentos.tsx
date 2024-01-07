import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';

// Importe o arquivo CSS atualizado
import './Alojamentos.scss';

const Alojamentos = () => {
  const [properties, setProperties] = useState<DocumentData[]>([]);
  const [filter, setFilter] = useState<string>('');
  const history = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      setProperties(querySnapshot.docs.map(doc => doc.data() as DocumentData));
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
      {/* Título estilizado */}
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
              property.Name.toLowerCase().includes(searchValue) ||
              property.Description.toLowerCase().includes(searchValue) ||
              property.Address.toLowerCase().includes(searchValue)
            );
          })
          .map(property => (
            <div key={property.PropertyID} className="property-card" onClick={() => handlePropertyClick(property.PropertyID)}>
              <img src={property.Photos} alt={property.Name} />
              <div className="property-info">
                <h3>{property.Name}</h3>
                <p>{property.City}, {property.Country}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Alojamentos;
