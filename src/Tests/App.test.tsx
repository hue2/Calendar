import React, { useContext } from 'react';
import * as ReactAll from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import FullCalendar from '@fullcalendar/react';

import App from '../App';
import { EventContext } from '../Context/EventContext';
import { EventModal } from '../EventModal/EventModal';
import { StickyTable } from '../StickyTable/StickyTable';

Enzyme.configure({ adapter: new Adapter() });

describe('should renders App correctly', () => {
    let contextValues;
    let realUseContext;
    let wrapper;

    beforeEach(() => {
      contextValues = {
        events: [
          { _id: 'abc',
            note: 'apple', 
            date: '2020/06/15',
            sticky: true,
          },
        ],
        stickyEvents: [
          { _id: 'abcd',
            note: 'orange', 
            date: '2020/06/14',
            sticky: false,
          }
        ],
        onShow: jest.fn(),
        onEdit: jest.fn(),
      }

      jest.spyOn(ReactAll, 'useContext').mockImplementation(() => contextValues);

      wrapper = shallow(
        <EventContext.Provider value={contextValues}>
          <App />
        </EventContext.Provider>
      ).dive();

    });

    afterEach(() => {
      React.useContext = realUseContext;
    })

    it('should match snapshot', () => {
      const tree = shallow(<App />)
      expect(tree).toMatchSnapshot();
    });

    it('should render table, modal, and sticky table', () => {        
      expect(wrapper.find(FullCalendar).length === 1);
      expect(wrapper.find(EventModal).length === 1);
      expect(wrapper.find(StickyTable).length === 1);
    });

    it('should show add event button', () => {        
      expect(wrapper.find('.fc-addEventButton-button').length === 1);
    });
});