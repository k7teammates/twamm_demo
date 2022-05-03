import { Container, Row, Col, Nav } from 'react-bootstrap';
import Swap from "./components/Swap";
import "./bootstrap.css";

function Layout() {
  return (
    <Container>
      <Row>
        <Col ></Col>
        <Col className="pt-4">
          <Nav variant="pills" navbarScroll={true} className="justify-content-md-center" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">TWAMM</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">White Paper</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled">
                Team
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col ></Col>
      </Row>
      <Row>
        <Col sm></Col>
        <Col sm style={{ marginTop: "150px"}}>
          <Swap></Swap>
        </Col>
        <Col sm></Col>
      </Row>
    </Container>
  );
}

export default Layout;
