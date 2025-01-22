import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import LandingPage from './landing';
import RepairInstructionsBox from './RepairInstructions';
import { YearsListProps, Year } from './types_YearMakeModel';
import toolImage from './pexels-dmitry-demidov-515774-6789021.jpg'
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
          <AISearchBar currentCarName={currentCarName} />
          <ToolsNeededBox />
          <RepairInstructionsBox />
        </Container>
      )
    } else {
      return (
        <Container fluid className="d-flex flex-column justify-content-center  align-items-center ">
          <YearMakeModelBar years={modelYears} changeCarName={setCurrentCarName} />
          <AISearchBar currentCarName={currentCarName} />
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
    <div className="App"  >
    {/* <div className="App" style={{
      backgroundImage: `url(${toolImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }} > */}
      {/* <Container>
      <h1 onClick={() => {
        const tools = ['socket', 'wrench', 'screwdriver']
        setToolsNeeded(tools)
      }}>AutoPit AI</h1>
      </Container> */}
      <Container
        fluid
        className="d-flex justify-content-center flex-column align-items-center"
        style={{
          height: '100vh',
          backgroundImage: `url(${toolImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
        }}
      >
        <h1 style={{ fontSize: '80px' }}>AutoPitAI</h1>
        <span className='Landing-header' style={{ fontSize: '80px', display: 'block', marginTop: '10px' }}>⬇︎</span>
        <Button style={{ backgroundColor: 'red' }} size='lg'>Fix My Car!</Button>
        {/* <h1  className='Landing-header' style={{ fontSize: '80px'}}>AutoPitAI</h1> */}
      </Container>
      {showToolsAndInstructions()}
    </div>
  );
}

export default App;
