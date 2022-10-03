import React from 'react'
import {Route, Routes,NavLink} from 'react-router-dom'
import {Navbar, Container, Nav} from 'react-bootstrap'

//importing css file
import './App.css';
//importing pages
import InputForm from './Components/InputForm/InputForm'
import DisplayData from './Components/DisplayData/DisplayData'


function App() {
  return (
    <div className="App">
      {/* Routes */}
      <Routes>
        <Route path='/' element={<InputForm />} />
        <Route path='/display' element={<DisplayData />} />
      </Routes>
    </div>
  );
}

export default App;