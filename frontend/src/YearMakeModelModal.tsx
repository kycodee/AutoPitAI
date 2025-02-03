import { useState, useEffect } from 'react';
import { YearsListProps, Year } from './types_YearMakeModel';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import YearMakeModelBar from './YearMakeModelBar';
import axios from 'axios';
import AISearchBar from './AISearchBar';


function YearMakeModelModal(props: any) {

    const [modelYears, setModelYears] = useState<Year[]>([])
    const [currentCarName, setCurrentCarName] = useState<string>("")

    function getAllModelYears() {
        axios.get('https://api.nhtsa.gov/SafetyRatings')
            .then((results) => {
                setModelYears(results.data.Results)
            })
    }

    useEffect(() => {
        getAllModelYears()
    }, [])

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                    Select the year, make, and model of your ride...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{alignItems: 'center', textAlign: 'center'}}>
                <YearMakeModelBar years={modelYears} changeCarName={setCurrentCarName} />
                <AISearchBar currentCarName={currentCarName} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} style={{backgroundColor: 'red'}}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default YearMakeModelModal