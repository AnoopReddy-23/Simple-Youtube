import {Route, Routes,NavLink} from 'react-router-dom'
import {Navbar, Container, Nav} from 'react-bootstrap'

//importing css file
import './App.css';
//importing pages
import Home from './Components/Home/Home'
import InputForm from './Components/InputForm/InputForm'
import DisplatData from './Components/DisplayData/DisplayData'


function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect bg="info" expand="md" variant='info' sticky='top'>
          <Container>
            <Navbar.Brand href='#' className='me-auto'>AskMentor</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                  <Nav.Item>
                      <Nav.Link eventKey={1} to="/" as={NavLink}>
                        Home
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={1} to="/add" as={NavLink}>
                        Form
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey={1} to="/displaydata" as={NavLink}>
                        Dashboard
                      </Nav.Link>
                  </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
      </Navbar>
      {/* Routes */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/add' element={<InputForm />}/>
        <Route path='/displaydata' element={<DisplatData />}/>
      </Routes>
    </div>
  );
}

export default App;
