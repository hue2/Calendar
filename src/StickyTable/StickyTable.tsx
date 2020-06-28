import React from 'react';
import { Table } from 'react-bootstrap';

import "./StickyTable.scss";

export function StickyTable(props) {
    const { stickyEvents, handleEditModal } = props;

    return (
        <div data-testid="sticky-table">
            <Table id="sticky">
                <thead>
                <tr>
                    <th>Sticky Note</th>
                </tr>
                </thead>
                <tbody>
                {stickyEvents.length > 0 && stickyEvents.map(item => 
                    <tr onClick={() => handleEditModal(item)} key={item.id}>
                        <td>{item.title}</td>                 
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    )
}