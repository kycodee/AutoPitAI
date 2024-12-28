import ListGroup from 'react-bootstrap/ListGroup';


function ToolsNeededBox() {
    return (
        <div style={{ marginTop: '35px', marginBottom: '20px', border: '2px black solid', borderRadius: '7px', width: '800px' }}>
            <h2>Tools Needed:</h2>
            <ListGroup>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default ToolsNeededBox