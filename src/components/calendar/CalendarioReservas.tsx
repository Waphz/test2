 // test2/src/components/calendar/CalendarioReservas.tsx
import React from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Timestamp } from 'firebase/firestore';

import { Reservas } from '../../models/Reservas';

const localizer = momentLocalizer(moment);

interface CalendarioReservasProps {
  reservas: Reservas[];
}

const CalendarioReservas = ({ reservas }: CalendarioReservasProps) => {
  const eventosCalendario = reservas.map(reserva => ({
    title: reserva.Plataforma + " - " + reserva.NumHospedes + " hóspedes",
    start: reserva.CheckIn.toDate(), // Já é um objeto Date
    end: reserva.CheckOut.toDate(), // Já é um objeto Date
    resource: reserva,
    }));
    

  const eventStyleGetter = (event: Event) => {
    let backgroundColor = 'lightgrey';
    switch (event.resource.Status) {
      case 'pendente':
        backgroundColor = 'orange';
        break;
      case 'decorrer':
        backgroundColor = 'green';
        break;
      case 'concluida':
        backgroundColor = 'blue';
        break;
      default:
        backgroundColor = 'lightgrey';
    }

    return { style: { backgroundColor } };
  };

  const handleSelectEvent = (event: Event) => {
    alert(`Reserva: ${event.title}\nStatus: ${event.resource.Status}`);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        
        events={eventosCalendario}
        
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      <div className="legenda-calendario" style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{ marginRight: '10px' }}><span style={{ backgroundColor: 'orange', padding: '5px' }}>Pendente</span></div>
        <div style={{ marginRight: '10px' }}><span style={{ backgroundColor: 'green', padding: '5px' }}>Em Decorrer</span></div>
        <div><span style={{ backgroundColor: 'blue', padding: '5px' }}>Concluída</span></div>
      </div>
    </div>
  );
};

export default CalendarioReservas;
