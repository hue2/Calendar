import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import App from './App';
import { EventProvider } from './Context/EventContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <EventProvider>
        <App />
      </EventProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
