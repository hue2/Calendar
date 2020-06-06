import React, { useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin  from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventModal } from './EventModal/EventModal';
import { IEvent, EventContext } from './Context/EventContext';
import './App.scss';

function App() {
  const context = useContext(EventContext);
  const { onShow, onEdit, events } = context;

  function handleShow() {
    onShow();
  }

  function handleEditModal(event : any) {
    let data : IEvent = {
      id: event.id,
      title: event.title,
      start: (event.start).toISOString().substring(0, 10),
      end: event.end
    }
    onEdit(data);
  }

  return (
      <div className="App">
        <FullCalendar 
          defaultView="listWeek" 
          header={{
            center: 'addEventButton',
          }}
          plugins={[ interactionPlugin, listPlugin  ]}
          selectable={true}
          customButtons={ 
            {
              addEventButton: {
                text: 'Add Event',
                click: handleShow,
              }
            }
          }
          
          events={events}
          dateClick={(info) => {
            alert(info.dateStr);
          }}
          eventClick={(info) => {
            handleEditModal(info.event);
          }}
          eventColor='#E79B25'
        />
        <EventModal />
      </div>
  );
}

export default App;
