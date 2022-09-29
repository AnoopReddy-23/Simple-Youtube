import {Route, Routes} from 'react-router-dom'

//importing css file
import './App.css';
//importing pages
import InputForm from './Components/InputForm/InputForm'
import DisplatData from './Components/DisplayData/DisplayData'


function App() {
  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        <Route path='/' element={<InputForm />}/>
        <Route path='/displaydata' element={<DisplatData />}/>
      </Routes>
    </div>
  );
}

export default App;
