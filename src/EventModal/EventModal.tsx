import React, { useContext } from 'react';
import { Modal, Button, FormControl, Form } from 'react-bootstrap';

import { useEvent } from '../Context/EventContext';

import "react-datepicker/dist/react-datepicker.css";
import "./EventModal.scss";

export function EventModal() {
    const { show, date, note, sticky, onClose, onDatePick, onNoteSet, onEventSave, onDelete, onSetSticky } = useEvent();

    return (
        <div data-testid="event-modal">
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add an event
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <div>
                                <Form.Label>
                                    Sticky:
                                </Form.Label>
                                <FormControl id="permanent" type="checkbox" 
                                    checked={sticky} 
                                    onChange={onSetSticky}
                                />
                            </div>
                            <Form.Label>
                                Date:
                            </Form.Label>
                            <FormControl id="date" type="date" 
                                value={date} 
                                onChange={onDatePick}
                                disabled={sticky}
                            />

                            <br />
                            <Form.Label>
                                Note:
                            </Form.Label >
                            <FormControl id="note" type="text" 
                                onChange={onNoteSet}
                                value={note}
                                as="textarea"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" className="mr-auto" onClick={onDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" data-testid="close-btn" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onEventSave("hello")}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}