import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Year } from './types_YearMakeModel';
import toolImage from './pexels-dmitry-demidov-515774-6789021.jpg'
import YearMakeModelModal from './YearMakeModelModal';
import './App.css';

function Home() {

  const [toolsNeeded, setToolsNeeded] = useState<string[]>([])
  const [modelYears, setModelYears] = useState<Year[]>([])
  const [currentCarName, setCurrentCarName] = useState<string>("")
  const [modalShow, setModalShow] = useState(false);
 
  function getAllModelYears() {
    axios.get('https://api.nhtsa.gov/SafetyRatings')
      .then((results) => {
        // console.log(results.data.Results)
        setModelYears(results.data.Results)
      })
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
      {/* <Form action='http://localhost:5177/api/GoogleLogin/login' method='get'>
      <Button style={{marginTop: '20px'}}  type='submit'>Login with Google</Button>
      </Form> */}
      </Container>
  );
}

export default Home;
