import { Route, Routes } from "react-router-dom"
import Home  from "./Home"
import ToolsNeededBox from "./ToolsNeeded";
import './App.css';

function App() {


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> }/>
        <Route path="/tools" element={ <ToolsNeededBox /> }/>
      </Routes>
    </div>
    
  );
}

export default App;
