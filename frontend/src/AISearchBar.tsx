import Button from 'react-bootstrap/Button';

function AISearchBar() {
    return (
        <div style={{ marginTop: '30px', alignItems: 'center'}}>
            <h2>How can I assist you with your vehicle today?</h2>
            <input type="text" style={{ width: '800px', height: '40px', marginTop: '30px', borderRadius: '7px' }} />
            <Button variant="primary" style={{ display: 'block', marginTop: '20px', width: '800px' }}>Search</Button>
        </div>
    )
}

export default AISearchBar