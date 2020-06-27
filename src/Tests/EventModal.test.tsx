import React, { useContext } from 'react';
import { render, fireEvent, queryByAttribute  } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';

import FullCalendar from '@fullcalendar/react';

import App from '../App';
import { EventContext } from '../Context/EventContext';
import { EventModal } from '../EventModal/EventModal';
import { EventProvider } from '../Context/EventContext';

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

        wrapper = mount(
            <EventProvider value={context}>
                <EventModal />
                <EventContext.Consumer>
                    {contextCallback}
                </EventContext.Consumer>
            </EventProvider>
        );        
    });

    afterEach(() => {
        //wrapper.unmount();
    });

    it("should match snapshot", () => {
        const tree = shallow(<EventModal />);
        expect(tree).toMatchSnapshot();
    });

    it('should render', () => {
        jest.mock("../Context/");

        const { getByText } = render(
            <EventProvider value={context}>
                <EventModal />           
            </EventProvider>
        );

        const closeBtn = getByText('Close');
        fireEvent.click(closeBtn);
        expect(contextCallback).toHaveBeenCalledTimes(1);
    })
})