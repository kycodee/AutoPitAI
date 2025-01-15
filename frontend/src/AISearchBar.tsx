import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';

function AISearchBar() {

    const [userRequest, setUserRequest] = useState("")
    const [chatResponse, setChatResponse] = useState("")

    function callOpenAIAPIwithUserRequest(questionFromUser: string) {
        axios.get(`http://localhost:5177/api/OpenAi/${questionFromUser}`)
            .then((results) => {
                // console.log(results.data)
                setChatResponse(results.data)
            })
    }

    function showResponseIfThere() {
        if (chatResponse !== "") {
            return (
                <div>
                    <h3>{chatResponse}</h3>
                </div>
            )

        }
    }

    return (
        <div style={{ marginTop: '30px', alignItems: 'center' }}>
            <h2>How can I assist you with your vehicle today?</h2>
            <input type="text" style={{ width: '800px', height: '40px', marginTop: '30px', borderRadius: '7px' }}
                onChange={(e) => {
                    setUserRequest(e.target.value)
                }}
            />
            <Button variant="primary" style={{ display: 'block', marginTop: '20px', width: '800px' }}
                onClick={() => {
                    callOpenAIAPIwithUserRequest(userRequest)
                }}>Search</Button>
            {showResponseIfThere()}
        </div>
    )
}

export default AISearchBar