import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export function NavbarComponent() {
  return (
    <Navbar expand="lg" className="navbar-dark bg-body-tertiary navbar-color shadow-lg p-3 mb-5 bg-white">
      <Container>
        <Navbar.Brand href="#home" className="m-auto">Musio</Navbar.Brand>        
      </Container>
    </Navbar>
  );
}