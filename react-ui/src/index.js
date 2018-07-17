import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const THEME = createMuiTheme({
  typography: {
   fontFamily: "Titillium Web, sans-serif",
   fontSize: 16,
   fontWeightLight: 300,
   fontWeightRegular: 400,
   fontWeightMedium: 500
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker();
