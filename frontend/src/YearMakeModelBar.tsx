import React, { useState, useEffect, SetStateAction } from "react";
import axios from "axios";
import FormSelect from 'react-bootstrap/FormSelect';
import { YearsListProps, Year, ComponentProps } from "./types_YearMakeModel";


function YearMakeModelBar({ years, changeCarName }: ComponentProps) {


    const [carMakesOfYear, setCarMakesOfYear] = useState<MakeObj[]>([])
    const [carModelsOfSelectedMake, setCarModelsOfSelectedMake] = useState<ModelObj[]>([])

    interface MakeObj {
        ModelYear: string,
        Make: string
    }

    interface ModelObj {
        ModelYear: string,
        Make: string,
        Model: string
    }

    useEffect(() => {

    }, [carMakesOfYear, carModelsOfSelectedMake])

    return (
        <div style={{ width: '800px' }}>
            <FormSelect aria-label="Default select example" onChange={(e) => {
                changeCarName(`${e.target.value}`)
                axios.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${e.target.value}`)
                    .then((results) => {
                        // console.log(results.data.Results)
                        setCarMakesOfYear(results.data.Results)
                    })
            }}>
                <option>Year</option>
                {years.map((year) =>
                    <option value={year.ModelYear} key={year.ModelYear}>{year.ModelYear}</option>

                )}
            </FormSelect>
            <FormSelect aria-label="Default select example" onChange={(e) => {
                changeCarName((prevName) => prevName + " " + e.target.value) 
                axios.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${carMakesOfYear[0].ModelYear}/make/${e.target.value}`)
                    .then((results) => {
                        // console.log(results.data.Results)
                        setCarModelsOfSelectedMake(results.data.Results)
                    })
                }}>
                <option>Make</option>
                {carMakesOfYear.map((makesObj) =>
                    <option value={makesObj.Make} key={makesObj.Make}>{makesObj.Make}</option>
                )}
            </FormSelect>
            <FormSelect aria-label="Default select example" onChange={(e) => {
                changeCarName((prevName) => prevName + " " + e.target.value)
            }}>
                <option>Model</option>
                {carModelsOfSelectedMake.map((modelObj) =>
                    <option value={modelObj.Model} key={modelObj.Model}>{modelObj.Model}</option>
                )}
            </FormSelect>
        </div>
    )
}

export default YearMakeModelBar