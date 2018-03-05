import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tasks from './tasks/Tasks';
import store from './configureStore';

const muiTheme = createMuiTheme({
  typography: {
    fontFamily: '"Quicksand", sans-serif',
  }
});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider theme={muiTheme}>
        <Component store={store} />
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Tasks);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./tasks/Tasks', () => {
    const NextApp = require('./tasks/Tasks').default;
    render(NextApp);
  });
}
