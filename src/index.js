import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers/reducers'
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { request, AuthenticationService } from './helpers'

request('/auth/token')
.then((response)=>{
  AuthenticationService.setAuthState(response.data)
})

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
