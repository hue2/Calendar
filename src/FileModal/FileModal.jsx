import React, { useContext } from 'react';

import { Button } from 'react-bootstrap';

import { EventContext } from '../Context/EventContext';

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