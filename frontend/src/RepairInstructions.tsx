import ListGroup from 'react-bootstrap/ListGroup';


function RepairInstructionsBox() {
    return (
        <div style={{ marginTop: '35px', marginBottom: '20px', border: '2px black solid', borderRadius: '7px', width: '800px', maxHeight: '295px', overflow: 'scroll' }}>
            <h2>Instructions:</h2>
            <ListGroup as="ol" numbered>
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default RepairInstructionsBox