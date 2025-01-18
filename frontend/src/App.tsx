import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import LandingPage from './landing';
import RepairInstructionsBox from './RepairInstructions';
import { YearsListProps, Year } from './types_YearMakeModel';
import './App.css';

function App() {

  const [toolsNeeded, setToolsNeeded] = useState<string[]>([])
  const [modelYears, setModelYears] = useState<Year[]>([])
  const [currentCarName, setCurrentCarName] = useState<string>("")
  // const [query, setQuery] = useState("")


  // function changeCarName(name: string) {
  //   setCurrentCarName(name)
  // }

  function getAllModelYears() {
    axios.get('https://api.nhtsa.gov/SafetyRatings')
      .then((results) => {
        // console.log(results.data.Results)
        setModelYears(results.data.Results)
      })
  }

  function showLandingPageInitially() {
    return (
      <LandingPage />
    )
  }


  function showToolsAndInstructions() {
    if (toolsNeeded.length !== 0) {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
          {/* <YearMakeModelBar years={modelYears}/>
          <AISearchBar /> */}
          <YearMakeModelBar years={modelYears} changeCarName={setCurrentCarName} />
          <AISearchBar currentCarName={currentCarName}/>
          <ToolsNeededBox />
          <RepairInstructionsBox />
        </Container>
      )
    } else {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
          <YearMakeModelBar years={modelYears} changeCarName={setCurrentCarName}/>
          <AISearchBar currentCarName={currentCarName}/>
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
      {/* <Container>
      <h1 onClick={() => {
        const tools = ['socket', 'wrench', 'screwdriver']
        setToolsNeeded(tools)
      }}>AutoPit AI</h1>
      </Container> */}
      <Container
      fluid
      className="d-flex justify-content-center flex-column align-items-center"
      style={{ height: '100vh' }}
    >
      <h1 style={{ fontSize: '80px'}}>AutoPitAI</h1>
      <span className='Landing-header' style={{ fontSize: '80px', display: 'block'}}>⬇︎</span>
      {/* <h1  className='Landing-header' style={{ fontSize: '80px'}}>AutoPitAI</h1> */}
    </Container>
      {showToolsAndInstructions()}
    </div>
  );
}

export default App;
