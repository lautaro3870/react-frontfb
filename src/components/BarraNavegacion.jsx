import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function BarraNavegacion() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/react-frontfb/proyectos">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                localStorage.setItem("token", "");
              }}
              href="/react-frontfb"
            >
              Home
            </Nav.Link>
            <Nav.Link href="/react-frontfb/formulario">Nuevo</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default BarraNavegacion;
