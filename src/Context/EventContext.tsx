import React, { useState, createContext, useEffect, useContext } from "react";

import Db from '../Database/Db';
import { IEventDb, IContextProps, IEvent } from './Types';

const EventContext = createContext({} as IContextProps);

const db = new Db();

function EventProvider(props: any) {
    let defaultDate = new Date().toISOString().substring(0, 10);

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(defaultDate);
    const [note, setNote] = useState("");
    const [id, setId] = useState("");
    const [sticky, setSticky] = useState(false);
    const [events, setEvent] = useState<Array<IEvent>>([]);
    const [stickyEvents, setStickyEvents] = useState<Array<IEvent>>([]);

    useEffect(() => {
       getEvents();
    }, []);

    function handleShow() {
        setShow(true);
    }

    function getEvents() {
        db.getEvent().then((docs : any) => {
            let nonStickEvents = docs.filter(x => x.sticky === undefined || x.sticky === false);
            let allEvents = nonStickEvents.map((item : any) => ({
                id: item._id,
                title: item.note,
                start: item.date,
                end: item.end,
                sticky: false
            }));
            setEvent(allEvents);

            let stickEventsOnly = docs.filter(x => x.sticky !== undefined && x.sticky === true);
            let stickyEvents = stickEventsOnly.map((item : any) => ({
                id: item._id,
                title: item.note,
                start: item.date,
                end: item.end,
                sticky: true
            }));

            setStickyEvents(stickyEvents);
        })
        .catch(ex => {
            console.log(ex);
        });
    }

    function handleEditModalShow(event : IEvent) {
        setId(event.id);
        setNote(event.title);
        setDate(event.start);
        setSticky(event.sticky)
        setShow(true);
    }
    
    function handleClose() {
        handleReset();
        setShow(false);
    }

    function handleReset() {
        setId("");
        setNote("");;
        setDate(defaultDate);
        setSticky(false);
    }

    function handleDatePick(event : any) {
        setDate(event.target.value);
    }

    function handleNoteSet(event : any) {
        setNote(event.target.value);
    }
    
    function handleSetSticky(event : any) {
        setSticky(event.target.checked);
    }
    
    function handleEventSave() {
       if (id === null || id === "") {
            handleCreate();
       }
       else {
            handleEdit();
       }
    }

    function handleDelete() {
        db.deleteEvent(id).then(() => {
            handleClose();
            getEvents();
        })
    }

    function handleCreate() {
        db.createEvent({ date, note, sticky }).then((result : IEventDb) => {
            getEvents();
            handleClose();
        });
    }
     
    function handleEdit() {
        db.editEvent(id, { date, note, sticky }).then((result : IEventDb) => {
            getEvents();
            handleClose();
        });
    }  

    return (
        <EventContext.Provider value={{
                show, 
                date, 
                note,
                events,
                sticky,
                stickyEvents,
                onShow: handleShow, 
                onClose: handleClose,
                onDatePick: handleDatePick, 
                onNoteSet: handleNoteSet,
                onEventSave: handleEventSave,
                onEdit: handleEditModalShow,
                onDelete: handleDelete,
                onSetSticky: handleSetSticky,
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}

const useEvent = () => useContext(EventContext);

export { EventContext, EventProvider, useEvent }