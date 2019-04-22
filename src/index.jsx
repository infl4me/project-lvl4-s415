import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Cookie from 'js-cookie';
import reducers from './reducers';
import App from './components/App';
import { UserNameProvider } from './components/userNameContext';
import '../assets/application.css';
import 'typeface-roboto';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

let username = Cookie.get('username');
if (!username) {
  username = faker.name.findName();
  Cookie.set('username', username);
}

/* eslint-disable no-underscore-dangle */
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable */

// can't pass undefined to compose
const args = [
  applyMiddleware(thunk),
  reduxDevtools && reduxDevtools(),
].filter(Boolean);

const store = createStore(
  reducers,
  compose(...args),
);

const theme = createMuiTheme({
  palette: {
    channels: {
      main: '#1A1D21',
    },
  },
  mixins: {
    drawerWidth: '240px',
  },
});

console.log(theme);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <UserNameProvider value={username}>
        <App />
      </UserNameProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
