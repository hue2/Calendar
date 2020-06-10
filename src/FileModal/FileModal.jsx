import React, { useContext } from 'react';
import { EventContext } from '../Context/EventContext';
import { Button } from 'react-bootstrap';

export function FileModal() {
    const context = useContext(EventContext);
    const { onExportSelect } = context;
    return (
        <div>
            <input webkitdirectory="" type="file" onChange={onExportSelect}/>
            <Button className="export-btn">Export Data</Button>
        </div>
    )
}