import React from 'react';
import { Container } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import RepairInstructionsBox from './RepairInstructions';
import './App.css';

function App() {
  return (
    <div className="App" >
      <h1>AutoPit AI</h1>
      <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
        <YearMakeModelBar />
        <AISearchBar />
        <ToolsNeededBox />
        <RepairInstructionsBox />
      </Container>
    </div>
  );
}

export default App;
