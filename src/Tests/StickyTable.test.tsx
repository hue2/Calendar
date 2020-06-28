import React from 'react';
import { render, getByTestId  } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { EventContext } from '../Context/EventContext';
import { StickyTable } from '../StickyTable/StickyTable';

Enzyme.configure({ adapter: new Adapter() });

describe("test sticky table modal", () => {
    let contextCallback, stickyEvents, wrapper;

    beforeEach(() => { 
        stickyEvents = [
            {
                id: 1,
                title: 'hello',
            }
        ]
        contextCallback = jest.fn();
        wrapper = render(
            <EventContext.Provider value={contextCallback}>
                <StickyTable stickyEvents={stickyEvents}/>     
            </EventContext.Provider>,
        );
    });

    it("should match snapshot", () => {
        const tree = shallow(<StickyTable stickyEvents={stickyEvents} />);
        expect(tree).toMatchSnapshot();
    });

    it('should render', () => {
        const { getByTestId } =  wrapper;

        const table = getByTestId('sticky-table');
      
        expect(table).toBeInTheDocument();      
    })
})