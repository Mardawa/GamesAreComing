import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

import AppNavbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';

import { Provider } from 'react-redux';
import store from './store';

import mainLogo from './assets/logo/twitter_header_photo_2.png';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container className="text-center">
          <img className="logo" src={mainLogo} alt="logo" />
          <br />
          <br />
          <ShoppingList />
          <br />
          <ItemModal />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
