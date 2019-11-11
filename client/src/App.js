import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

import AppNavbar from './components/Navbar';
import TimerList from './components/countdown/TimerList';
import ItemModal from './components/countdown/itemModal';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import mainLogo from './assets/logo/Image1.png';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container className="text-center mw-100 px-auto">
          <div className="pb-1 mb-1">
            <img className="logo" src={mainLogo} alt="logo" />
          </div>
          <div className="pb-1 mb-3">
            <TimerList />
          </div>
          <ItemModal />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
