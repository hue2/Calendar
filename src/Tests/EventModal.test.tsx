import React, { useContext } from 'react';
import { render  } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

import FullCalendar from '@fullcalendar/react';

import App from '../App';
import { EventContext, EventProvider, useEvent } from '../Context/EventContext';
import { EventModal } from '../EventModal/EventModal';

Enzyme.configure({ adapter: new Adapter() });

describe("test event modal", () => {
    let wrapper, context, contextCallback;

    beforeEach(() => {
        context = {
            show: false,
            date: '2020/06/19',
            note: 'note note note',
            sticky: false, 
            onClose: jest.fn(),
            onDatePick: jest.fn(),
            onNoteSet: jest.fn(),
            onEventSave: jest.fn(),
            onDelete: jest.fn(),
            onSetSticky: jest.fn(),
        }
        contextCallback = jest.fn();
        wrapper =  render(
            <EventContext.Provider value={contextCallback}>
                <EventModal />     
            </EventContext.Provider>,
        );
    });

    it("should match snapshot", () => {
        const tree = shallow(<EventModal />);
        expect(tree).toMatchSnapshot();
    });

    it('should render', () => {
        const { getByTestId } = wrapper;

        const modal = getByTestId('event-modal');
      
        expect(modal).toBeInTheDocument();      
    })
})