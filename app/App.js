import React from 'react';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigator';
import store from './store';

const App = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default App;
