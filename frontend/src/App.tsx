import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import RepairInstructionsBox from './RepairInstructions';
import './App.css';

function App() {

  const [toolsNeeded, setToolsNeeded] = useState<string[]>([])

  function showToolsAndInstructions() {
    if(toolsNeeded.length !== 0){
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
        <YearMakeModelBar />
        <AISearchBar />
        <ToolsNeededBox />
        <RepairInstructionsBox />
      </Container>
      )
    } else {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
        <YearMakeModelBar />
        <AISearchBar />
      </Container>
      )
    }
  }

  useEffect(() => {

  }, [toolsNeeded])

  return (
    <div className="App" >
      <h1 onClick={() => {
        const tools = ['socket', 'wrench', 'screwdriver']
        setToolsNeeded(tools)
      }}>AutoPit AI</h1>
      {/* <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
        <YearMakeModelBar />
        <AISearchBar />
        <ToolsNeededBox />
        <RepairInstructionsBox />
      </Container> */}
      {showToolsAndInstructions()}
    </div>
  );
}

export default App;
