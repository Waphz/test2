import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, Timestamp } from 'firebase/firestore';
import db from '../../firebaseConfig';
import { Reservas as ReservasModel } from '../../models/Reservas';
import { Plataformas as PlataformasModel } from '../../models/Plataformas';
import CalendarioReservas from '../../components/calendar/CalendarioReservas';

const Home = () => {
  const [reservas, setReservas] = useState<ReservasModel[]>([]);
  const [filtroReservas, setFiltroReservas] = useState('todas');
  const [reservaSelecionada, setReservaSelecionada] = useState<ReservasModel | null>(null);

  useEffect(() => {
    const fetchPlataformas = async () => {
      const plataformasSnapshot = await getDocs(collection(db, 'plataformas'));
      const plataformas = plataformasSnapshot.docs.reduce((acc, doc) => {
        const plataforma = doc.data() as PlataformasModel;
        acc[plataforma.IDPlataforma] = plataforma.Nome;
        return acc;
      }, {} as { [id: string]: string });

      fetchReservas(plataformas);
    };

    const fetchReservas = async (plataformas: { [id: string]: string }) => {
      const reservasQuery = query(collection(db, 'reservas'));
      const reservasSnapshot = await getDocs(reservasQuery);
      const reservasData = reservasSnapshot.docs.map(doc => {
        const data = doc.data() as ReservasModel;
        return {
          ...data,
          CheckIn: data.CheckIn instanceof Timestamp ? data.CheckIn.toDate() : new Date(data.CheckIn.seconds * 1000),
          CheckOut: data.CheckOut instanceof Timestamp ? data.CheckOut.toDate() : new Date(data.CheckOut.seconds * 1000),
          Plataforma: plataformas[data.Plataforma] || 'Desconhecida',
        };
      });
      setReservas(reservasData);
    };



    fetchPlataformas();
  }, []);

  const reservasFiltradas = reservas.filter(reserva => filtroReservas === 'todas' || reserva.Status === filtroReservas);

  const handleReservaClick = (reserva: ReservasModel) => {
    setReservaSelecionada(reserva);
  };

  const renderDetalhesReserva = () => {
    if (!reservaSelecionada) return null;
    return (
      <div>
        <h2>Detalhes da Reserva</h2>
        <p>Cliente: {reservaSelecionada.IDCliente}</p>
        <p>Data Check-in: {reservaSelecionada.CheckIn.toLocaleDateString()}</p>
        <p>Data Check-out: {reservaSelecionada.CheckOut.toLocaleDateString()}</p>
        <p>Plataforma: {reservaSelecionada.Plataforma}</p>
        <p>Status: {reservaSelecionada.Status}</p>
      </div>
    );
  };

  return (
    <div className="home-container">
      <h1>Página Inicial</h1>
      <div className="home-content">
        <div className="reservas-lista">
          <h2>Reservas</h2>
          <ul>
            {reservasFiltradas.map(reserva => (
              <li key={reserva.IDReserva} onClick={() => handleReservaClick(reserva)} className="reserva-item">
                {reserva.IDCliente} - {reserva.CheckIn.toLocaleDateString()} a {reserva.CheckOut.toLocaleDateString()} ({reserva.Plataforma})
              </li>
            ))}
          </ul>
        </div>
        <div className="calendario-wrapper">
          <CalendarioReservas reservas={reservas} />
        </div>
      </div>
      {renderDetalhesReserva()}
    </div>
  );
};

export default Home;
