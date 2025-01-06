import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import RepairInstructionsBox from './RepairInstructions';
import { YearsListProps, Year } from './types_YearMakeModel';
import './App.css';

function App() {

  const [toolsNeeded, setToolsNeeded] = useState<string[]>([])
  const [modelYears, setModelYears] = useState<Year[]>([])


  function getAllModelYears() {
    axios.get('https://api.nhtsa.gov/SafetyRatings')
      .then((results) => {
        // console.log(results.data.Results)
        setModelYears(results.data.Results)
      })
  }

  function showToolsAndInstructions() {
    if (toolsNeeded.length !== 0) {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
          <YearMakeModelBar years={modelYears} />
          <AISearchBar />
          <ToolsNeededBox />
          <RepairInstructionsBox />
        </Container>
      )
    } else {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
          <YearMakeModelBar years={modelYears} />
          <AISearchBar />
        </Container>
      )
    }
  }


  useEffect(() => {
    getAllModelYears()
  }, [])

  useEffect(() => {

  }, [toolsNeeded])

  return (
    <div className="App" >
      <h1 onClick={() => {
        const tools = ['socket', 'wrench', 'screwdriver']
        setToolsNeeded(tools)
      }}>AutoPit AI</h1>
      {showToolsAndInstructions()}
    </div>
  );
}

export default App;
