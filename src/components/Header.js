import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = (props) => {
    return (<>
        <Navbar bg="light" expand="lg" >
      <Container>
        <Navbar.Brand href="/">Vu Tran</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="/" >Home</Nav.Link>
              <Nav.Link href="/user">Manage User</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title="Setting">
                <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/Outlogin">OutLogin</NavDropdown.Item>
              </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}


export default Header;