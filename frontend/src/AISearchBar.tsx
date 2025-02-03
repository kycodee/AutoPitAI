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


            console.log(chatResponse)
            //Tools Needed ordered list
            let toolsNeededStr;
           
            toolsNeededStr = chatResponse.slice(chatResponse.indexOf("### Tools Needed:"), chatResponse.indexOf("### Parts Needed"))
            let toolsNeededArr = toolsNeededStr.split(". **")
            for(let i = 0; i < toolsNeededArr.length; i++){
                toolsNeededArr[i] = toolsNeededArr[i].slice(0, -1).trim()
                if(i !== 0){
                  toolsNeededArr[i] = "**" + toolsNeededArr[i]
                }
            }
            toolsNeededArr.shift()



            let partsNeededStr;
            partsNeededStr = chatResponse.slice(chatResponse.indexOf("### Parts Needed:"), chatResponse.indexOf("### Instructions"))
            let partsNeededArr = partsNeededStr.split(". **")
            for(let i = 0; i < partsNeededArr.length; i++){
                partsNeededArr[i] = partsNeededArr[i].slice(0, -1).trim()
                if(i !== 0){
                  partsNeededArr[i] = "**" + partsNeededArr[i]
                }
            }
            partsNeededArr.shift()

            let instructionsStr;
            instructionsStr = chatResponse.slice(chatResponse.indexOf("### Instructions:"))
            let instructionsArr = instructionsStr.split(". **")
            for(let i = 0; i < instructionsArr.length; i++){
                instructionsArr[i] = instructionsArr[i].slice(0, -1).trim()
                if(i !== 0){
                    instructionsArr[i] = "**" + instructionsArr[i]
                }
            }
            instructionsArr.shift()




            return (
                <div>
                    <h3>{chatResponse.slice(0, chatResponse.indexOf("#"))}</h3>
                    <h1>Tools Needed:</h1>
                    <ul>{toolsNeededArr.map(tool => (<li style={{listStyleType: 'none'}} key={tool}>{tool}</li>))}</ul>
                    <h1>Parts Needed:</h1>
                    <ul>{partsNeededArr.map(part => (<li style={{listStyleType: 'none'}} key={part}>{part}</li>))}</ul>
                    <h1>Instructions:</h1>
                    <ol>{instructionsArr.map(instruction => (<li key={instruction}>{instruction}</li>))}</ol>
                </div>
            )

        }
    }

    return (
        <div style={{ marginTop: '30px', alignItems: 'center' }}>
            <input type="text" style={{
                width: '95%',
                height: '40px',
                marginTop: '15px',
                borderRadius: '7px'
            }}
            placeholder="Please type the car part you'd like me to replace, or tell me about the issue you'd like me to fix."
                onChange={(e) => {
                    setUserRequest(e.target.value)
                }}
            />
            <Button variant="primary" style={{ display: 'block', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', width: '95%' }}
                onClick={() => {
                    console.log(currentCarName)
                    callOpenAIAPIwithUserRequest(`My car is a ${currentCarName}. ${userRequest}`)
                }}>Search</Button>
            {showResponseIfThere()}
        </div>
    )
}

export default AISearchBar