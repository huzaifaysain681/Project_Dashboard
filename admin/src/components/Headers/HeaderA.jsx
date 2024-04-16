import React from "react";
import { Card, CardBody, Button, CardTitle, Container, Row, Col, Collapse, Nav } from "reactstrap";
import { CSVLink } from 'react-csv'
import firebase from "firebase";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Produits
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            0
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-chart-pie" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="4">
                </Col>


              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
