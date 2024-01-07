import React, { useState, useEffect, useCallback } from 'react';
import db from '../../firebaseConfig';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import Scheduler from 'devextreme-react/scheduler';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import TextBox from 'devextreme-react/text-box';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './Reservas.scss';
import { parseISO, format } from 'date-fns';

interface Reserva {
  BookingID: string;
  CheckInDate: Date;
  CheckOutDate: Date;
  NumberOfGuests: number;
  PropertyID: string;
  Status: string;
  TotalPrice: number;
  UserID: string;
}

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const reservasData: Reserva[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            BookingID: data.BookingID,
            CheckInDate: data.CheckInDate.toDate(),
            CheckOutDate: data.CheckOutDate.toDate(),
            NumberOfGuests: data.NumberOfGuests,
            PropertyID: data.PropertyID,
            Status: data.Status,
            TotalPrice: data.TotalPrice,
            UserID: data.UserID,
          };
        });

        setReservas(reservasData);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div className="reservas-container">
      <h1 className="custom-page-title">Calendário de Reservas</h1>

      <Scheduler
        dataSource={reservas}
        views={['month', 'week', 'day']}
        defaultCurrentView="month"
        height={600}
        cellDuration={60}
        dateSerializationFormat="yyyy-MM-dd'T'HH:mm:ssXXX" // Formato de data
        startDayHour={0} // Hora de início do dia
        endDayHour={24} // Hora de fim do dia
        onCellClick={(e) => setSelectedDate(e.cellData.startDate)}
      />

      <TextBox
        value={filter}
        onValueChanged={(e) => setFilter(e.value)}
        placeholder="Filtrar por ID da propriedade ou nome do cliente"
      />

      <DataGrid dataSource={reservas}>
        <Column dataField="BookingID" caption="ID da Reserva" />
        <Column dataField="PropertyID" caption="ID da Propriedade" />
        <Column dataField="CheckInDate" caption="Check-In" dataType="date" format="dd/MM/yyyy HH:mm" />
        <Column dataField="CheckOutDate" caption="Check-Out" dataType="date" format="dd/MM/yyyy HH:mm" />
        <Column dataField="NumberOfGuests" caption="Número de Hóspedes" />
        <Column dataField="Status" caption="Status" />
        <Column dataField="TotalPrice" caption="Preço Total" />
        <Column dataField="UserID" caption="ID do Usuário" />
      </DataGrid>
    </div>
  );
};

export default Reservas;
