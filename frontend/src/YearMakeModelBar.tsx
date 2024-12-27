import React from "react";
import FormSelect from 'react-bootstrap/FormSelect';


function YearMakeModelBar() {
    return (
        <div style={{ width: '800px' }}>
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
        </div>
    )
}

export default YearMakeModelBar