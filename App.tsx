import React from 'react';
import 'react-native-gesture-handler';

import AppRouter from '@/App.router';
import AppBootstrap from '@/helpers/bootstrap/App.bootstrap';

function App(): JSX.Element {
  return (
    <AppBootstrap>
      <AppRouter />
    </AppBootstrap>
  );
}

export default App;
