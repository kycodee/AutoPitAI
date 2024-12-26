import React from "react";
import FormSelect from 'react-bootstrap/FormSelect';
// import { Form, FormSelect } from "react-bootstrap";


function YearMakeModelBar() {
    return (
        <>
        <FormSelect aria-label="Default select example">
            <option>Year</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
        </FormSelect>
        <FormSelect aria-label="Default select example">
            <option>Make</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
        </FormSelect>
        <FormSelect aria-label="Default select example">
            <option>Model</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
        </FormSelect>
        </>
    //     <Form>
    //      <select name="" id="">
    //             <option>Year</option>
    //             <option value="1">One</option>
    //             <option value="2">Two</option>
    //             <option value="3">Three</option>
    //         </select>
    //         <select name="" id="">
    //             <option>Make</option>
    //             <option value="1">One</option>
    //             <option value="2">Two</option>
    //             <option value="3">Three</option>
    //         </select>
    //         <select name="" id="">
    //             <option>Model</option>
    //             <option value="1">One</option>
    //             <option value="2">Two</option>
    //             <option value="3">Three</option>
    //         </select> 
    //   </Form>
            
    )
}

export default YearMakeModelBar