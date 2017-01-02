import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import reducer from './redux/reducers';
import getRoutes from './routes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const middleware = [ promiseMiddleware ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

injectTapEventPlugin();

render(
	<MuiThemeProvider>
	  <Provider store={store}>
	    {getRoutes()}
	  </Provider>
	</MuiThemeProvider>,
  document.getElementById('root')
)
