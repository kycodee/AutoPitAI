import React, { useState, useEffect } from "react";
import axios from "axios";
import FormSelect from 'react-bootstrap/FormSelect';
import { YearsListProps, Year } from "./types_YearMakeModel";


function YearMakeModelBar({ years }: YearsListProps) {


    const [carMakesOfYear, setCarMakesOfYear] = useState<MakeObj[]>([])
    const [carYear, setCarYear] = useState('')

    interface MakeObj {
        ModelYear: string,
        Make: string
    }

    function getAllMakesForModelYear() {
        axios.get(`api.nhtsa.gov/products/vehicles/makes?modelYear=${carYear}&issueType=r`)
            .then((results) => {
                // console.log(results.data.results)
                setCarMakesOfYear(results.data.results)
            })
    }


    useEffect(() => {

    }, [carMakesOfYear])
    // function selectModelYear() {
    //     return (
    //         <>
    //             {years.map((year) =>
    //                 <option value={year.modelYear} key={year.modelYear}>{year.modelYear}</option>

    //             )}
    //         </>
    //     )
    // }

    return (
        <div style={{ width: '800px' }}>
            <FormSelect aria-label="Default select example" onChange={(e) => {
                // setCarYear(e.target.value)
                axios.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${e.target.value}`)
            .then((results) => {
                // console.log(results.data.Results)
                setCarMakesOfYear(results.data.Results)
            })
            //     axios.get(`https://api.nhtsa.gov/products/vehicle/makes?modelYear=${e.target.value}&issueType=r`)
            // .then((results) => {
            //     // console.log(results.data.results)
            //     setCarMakesOfYear(results.data.results)
            // })
            }}>
                <option>Year</option>
                {years.map((year) =>
                    <option value={year.ModelYear} key={year.ModelYear}>{year.ModelYear}</option>

                )}
            </FormSelect>
            <FormSelect aria-label="Default select example">
                <option>Make</option>
                {carMakesOfYear.map((makesObj) =>
                    <option value={makesObj.Make} key={makesObj.Make}>{makesObj.Make}</option>

                )}
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