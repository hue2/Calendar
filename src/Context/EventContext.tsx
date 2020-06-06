import React, { useState, createContext, useEffect } from "react";
import Db from '../Database/Db';
import { IEventDb } from './Types';

interface IContextProps {
    show: boolean,
    date: string,
    note: string,
    events: Array<IEvent>,
    onShow: () => void,
    onClose: () => void,
    onDatePick: (event : any) => void,
    onNoteSet: (event : any) => void,
    onEventSave: (id: string | null) => void,
    onEdit: (event : IEvent) => void,
    onDelete: () => void,
}

export interface IEvent {
    id: string,
    start: string,
    end: string,
    title: string,
}

export const EventContext = createContext({} as IContextProps);

const db = new Db();
export function EventProvider(props: any) {
    let defaultDate = new Date().toISOString().substring(0, 10);

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(defaultDate);
    const [note, setNote] = useState("");
    const [id, setId] = useState("");
    const [events, setEvent] = useState<Array<IEvent>>([]);

    useEffect(() => {
       getEvents();
    }, []);

    function handleShow() {
        setShow(true);
    }

    function getEvents() {
        db.getEvent().then((docs : any) => {
            let allEvents = docs.map((item : any) => ({
                id: item._id,
                title: item.note,
                start: item.date,
                end: item.end,
            }));
            setEvent(allEvents);
        });
    }

    function handleEditModalShow(event : IEvent) {
        setId(event.id);
        setNote(event.title);
        setDate(event.start);
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
    }

    function handleDatePick(event : any) {
        setDate(event.target.value);
    }

    function handleNoteSet(event : any) {
        setNote(event.target.value);
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
        db.createEvent({ date, note }).then((result : IEventDb) => {
            let allEvents = [...events];
            let event : IEvent = { 
                id: result._id,
                title: result.note,
                start: result.date,
                end: result.date,
            }
            allEvents.push(event);
            setEvent(allEvents);
            handleClose();
        });
    }
     
    function handleEdit() {
        db.editEvent(id, { date, note }).then((result : IEventDb) => {
            let allEvents = [...events];
            let event : IEvent = { 
                id: id,
                title: note,
                start: date,
                end: date,
            }
            let index = allEvents.findIndex(x => x.id == id);
            allEvents[index] = event;
            setEvent(allEvents);
            handleClose();
        });
    }


    return (
        <EventContext.Provider value={{
                show, 
                date, 
                note,
                events,
                onShow: handleShow, 
                onClose: handleClose,
                onDatePick: handleDatePick, 
                onNoteSet: handleNoteSet,
                onEventSave: handleEventSave,
                onEdit: handleEditModalShow,
                onDelete: handleDelete,
            }}
        >
            {props.children}
        </EventContext.Provider>
    )
}
