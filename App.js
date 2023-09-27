import React from 'react';
import Navigation from './screens/Navigation';
import { AppStateProvider } from './helpers/AppStateContext';

 function App() {
  return (
    <AppStateProvider>
      <Navigation />
      </AppStateProvider>
  );
}
export default App;

