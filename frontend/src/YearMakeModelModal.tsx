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
                // console.log(results.data.Results)
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
                    Tell us about your vehicle...
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <YearMakeModelBar years={modelYears} changeCarName={setCurrentCarName} />
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default YearMakeModelModal