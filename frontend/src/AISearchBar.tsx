import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useState } from 'react';
import { AISearchBarProps } from './types_YearMakeModel';

function AISearchBar({ currentCarName }: AISearchBarProps) {

    const [userRequest, setUserRequest] = useState("")
    const [chatResponse, setChatResponse] = useState("")

    function callOpenAIAPIwithUserRequest(questionFromUser: string) {
        axios.get(`http://localhost:5177/api/OpenAi/${questionFromUser}`)
            .then((results) => {
                console.log(results)
                console.log(results.data)
                setChatResponse(results.data)
            })
    }

    function showResponseIfThere() {
        if (chatResponse !== "") {


            // setChatResponse(chatResponse.slice(0, chatResponse.indexOf("#")))
            //Tools Needed ordered list
            const toolsNeededStr = chatResponse.slice(chatResponse.indexOf("### Tools Needed:"), chatResponse.indexOf("### Instructions"))
            let toolsNeededArr = toolsNeededStr.split(". **")
            for(let i = 0; i < toolsNeededArr.length; i++){
                toolsNeededArr[i] = toolsNeededArr[i].slice(0, -1).trim()
                if(i !== 0){
                  toolsNeededArr[i] = "**" + toolsNeededArr[i]
                }
            }
            toolsNeededArr.shift()
            // toolsNeeded
            // console.log(toolsNeeded)

            return (
                <div>
                    <h3>{chatResponse.slice(0, chatResponse.indexOf("#"))}</h3>
                    <h1>Tools Needed:</h1>
                    <ol>{toolsNeededArr.map(tool => (<li key={tool}>{tool}</li>))}</ol>
                </div>
            )

        }
    }

    return (
        <div style={{ marginTop: '30px', alignItems: 'center' }}>
            {/* <h2>How can I assist you with your vehicle today?</h2> */}
            <input type="text" style={{
                width: '95%',
                height: '40px',
                marginTop: '15px',
                borderRadius: '7px'
            }}
            placeholder="Please type the car part you'd like me to replace, or tell me about the issue you'd like me to fix."
                // <input type="text" style={{ width: '800px', height: '40px', marginTop: '30px', borderRadius: '7px' }}
                onChange={(e) => {
                    setUserRequest(e.target.value)
                }}
            />
            <Button variant="primary" style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '95%' }}
                // <Button variant="primary" style={{ display: 'block', marginTop: '20px', width: '800px' }}
                onClick={() => {
                    console.log(currentCarName)
                    callOpenAIAPIwithUserRequest(`My car is a ${currentCarName}. ${userRequest}`)
                }}>Search</Button>
            {showResponseIfThere()}
        </div>
    )
}

export default AISearchBar