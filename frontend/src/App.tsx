import React from 'react';
import { Container } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import './App.css';

function App() {
  return (
    <div className="App" >
      <h1>AutoPit AI</h1>
      <Container fluid className="d-flex justify-content-center  min-vh-100">
        <YearMakeModelBar />
      </Container>
    </div>
  );
}

export default App;
