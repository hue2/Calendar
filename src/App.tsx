import React, { useContext } from 'react';

import FullCalendar from '@fullcalendar/react';
import listPlugin  from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from 'react-bootstrap';

import { EventModal } from './EventModal/EventModal';
import { EventContext } from './Context/EventContext';
import { IEvent } from './Context/Types';
import './App.scss';

function App() {
  const context = useContext(EventContext);
  const { onShow, onEdit, events, onExport, onImport, onImportSel } = context;

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
        <br />
        <FullCalendar 
          defaultView="listWeek" 
          views={{
            listWeek: { buttonText: 'Week' },
            listMonth: { buttonText: 'Month' },
          }}
          header={{
            center: 'addEventButton',
            right: 'prev, listWeek, listMonth, next'
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
        <br />
        {/* <div  className="f-left">
          <input type="file" accept=".json" onChange={(e : any) => onImportSel(e.target.files[0].path)} />
          <Button variant="success" onClick={onImport}>Import</Button>
        </div>
        <Button onClick={onExport}>Export</Button> */}
      </div>
  );
}

export default App;
