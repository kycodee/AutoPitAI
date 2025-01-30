import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import YearMakeModelBar from './YearMakeModelBar';
import AISearchBar from './AISearchBar';
import ToolsNeededBox from './ToolsNeeded';
import LandingPage from './landing';
import RepairInstructionsBox from './RepairInstructions';
import { YearsListProps, Year } from './types_YearMakeModel';
import toolImage from './pexels-dmitry-demidov-515774-6789021.jpg'
import YearMakeModelModal from './YearMakeModelModal';
import './App.css';

function App() {

  const [toolsNeeded, setToolsNeeded] = useState<string[]>([])
  const [modelYears, setModelYears] = useState<Year[]>([])
  const [currentCarName, setCurrentCarName] = useState<string>("")
  const [modalShow, setModalShow] = useState(false);
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

  function handleGoogleLogin() {
      // Make the GET request to the backend API to trigger the Google login
    axios
    .get(`http://localhost:5177/api/GoogleLogin/login`)  // You can change the endpoint as per your backend
    .then((response) => {
      console.log('Google login response:', response);
      // // You can store the token, redirect, or update the UI here
      // // For example, you could redirect or display the login success message
      window.location.href = 'airbnb.com'; // or wherever you want to go after login
      // window.location.href = response.data.redirectUrl;  // Redirect URL returned from backend
      console.log('Successfully triggered Google login redirect');
    })
    .catch((error) => {
      console.error('Google login error:', error);
    });
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
        <h1 style={{ fontSize: '80px', color: 'red' }}>AutoPitAI</h1>
        <span className='Landing-header' style={{ fontSize: '80px', display: 'block', marginTop: '10px', color: 'blue' }}>⬇︎</span>
        <Button style={{ backgroundColor: 'red' }} size='lg' onClick={() => setModalShow(true)}>Fix My Car!</Button>
        <YearMakeModelModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Form action='http://localhost:5177/api/GoogleLogin/login' method='get'>
      <Button style={{marginTop: '20px'}}  type='submit'>Login with Google</Button>
      {/* <Button style={{marginTop: '20px'}}  onClick={handleGoogleLogin}>Login with Google</Button> */}

      </Form>
        {/* <h1  className='Landing-header' style={{ fontSize: '80px'}}>AutoPitAI</h1> */}
      </Container>
      {showToolsAndInstructions()}
    </div>
  );
}

export default App;
