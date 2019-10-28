import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'reactstrap';

import AppNavbar from './components/Navbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <h1>Games are coming !</h1>
          <ItemModal />
          <br />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
