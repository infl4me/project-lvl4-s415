import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import faker from 'faker';
import Cookie from 'js-cookie';
import reducers from './reducers';
import App from './components/App';
import { UserNameProvider } from './components/userNameContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// eslint-disable-next-line no-undef
console.log(gon);

let username = Cookie.get('username');
if (!username) {
  username = faker.name.findName();
  Cookie.set('username', username);
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <UserNameProvider value={username}>
      <App />
    </UserNameProvider>
  </Provider>,
  document.getElementById('root'),
);
