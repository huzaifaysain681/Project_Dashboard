import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © 2020{" "}
              <a
                className="font-weight-bold ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                PMAS UAAR VEHICLE MANAGMENT
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank">
                  Developed by Abdullah & Maryam
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank"></NavLink>
              </NavItem>

              <NavItem>
                <NavLink rel="noopener noreferrer" target="_blank"></NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </footer>
    );
  }
}

export default Footer;
