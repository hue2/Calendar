import React, { useContext } from 'react';

import FullCalendar from '@fullcalendar/react';
import listPlugin  from '@fullcalendar/list';
import dayGridPlugin  from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { EventModal } from './EventModal/EventModal';
import { EventContext } from './Context/EventContext';
import { IEvent } from './Context/Types';
import { StickyTable } from './StickyTable/StickyTable';
import './App.scss';

function App() {
  const context = useContext(EventContext);
  const { events, stickyEvents, onShow, onEdit } = context;

  function handleShow() {
    onShow();
  }

  function handleEditModal(event : any) {
    let data : IEvent = {
      id: event.id,
      title: event.title,
      start: event.start ? (new Date(event.start)).toISOString().substring(0, 10) : event.start,
      end: event.end,
      sticky: event.sticky,
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
                dayGrid30Day: {
                  type: 'listMonth',
                  duration: { days: 30 },
                  buttonText: 'Month'
                }
              }}
              header={{
                center: 'addEventButton',
                right: 'prev, listWeek, dayGrid30Day, next'
              }}
              plugins={[ interactionPlugin, listPlugin, dayGridPlugin  ]}
              selectable={true}
              customButtons={ 
                {
                  addEventButton: {
                    text: 'Add Event',
                    click: handleShow,
                  }
                }
              }
              allDayText={""}
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
          <br/>
          <StickyTable stickyEvents={stickyEvents} handleEditModal={handleEditModal} />
       
      </div>
      
  );
}

export default App;
