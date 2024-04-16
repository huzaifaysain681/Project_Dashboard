import React from "react";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Modal,
  ModalBody,
  Spinner,
} from "reactstrap";
import Header from "../components/Headers/Header.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import TableRow from "../components/Tables/TableManageRoles";

const excludeColumns = ["id", "color"];
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/"
    : "https://sami-admin.herokuapp.com/api/";

class Tables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Buttondisabled: false,
      search: "",
      data: [],
      alert: null,
      pics: [],
      ProdSearch: [],
      modalvisible: false,
      item: {},
      pass: "",
      email: "",
      role: 1,
      isLoading: true,
    };
    // this.setState({ name: name });
  }
  handleChange = (value) => {
    this.setState({ search: value });
    this.filterData(value);
  };
  filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") this.setState({ data: this.state.ProdSearch });
    else {
      const filteredData = this.state.ProdSearch.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key] &&
              item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      this.setState({ data: filteredData });
    }
  };

  deletemodal = (id) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Delete !`}
          onConfirm={() => {}}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="danger"
          showCancel
          confirmBtnText="Yes"
        ></SweetAlert>
      ),
    });
  };
  errormodal = (msg = undefined) => {
    this.setState({
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={msg ? msg : "Something went wrong :("}
          onConfirm={() => this.setState({ alert: null })}
          confirmBtnBsStyle="danger"
          confirmBtnText="OK"
        ></SweetAlert>
      ),
    });
  };
  addmodal = () => {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "100px" }}
          title={`Add New User`}
          onConfirm={() => {}}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnBsStyle="success"
          showCancel
          confirmBtnText="Add"
        >
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
            style={{
              display: "block",
              border: "1px solid #11a0ef",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ pass: e.target.value })}
            style={{
              display: "block",
              border: "1px solid #11a0ef",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
            }}
          />
          <select
            onChange={(e) => this.setState({ role: e.target.value })}
            style={{
              display: "block",
              border: "1px solid #11a0ef",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
            }}
          >
            <option value={1}>Master</option>
            <option value={2}>Admin</option>
            <option value={3}>Accountant</option>
          </select>
        </SweetAlert>
      ),
    });
  };

  createUser = async () => {
    if (this.state.email && this.state.pass && this.state.role) {
      this.setState({ alert: null });
      fetch(`${BASE_URL}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          pass: this.state.pass,
          role: this.state.role,
        }),
      })
        .then((res) => res.text()) // or res.json()
        .then(async (res) => {
          let re = JSON.parse(res);
        });
    } else {
      this.errormodal("Please fill out all the fields");
    }
  };

  editUser = async (role = 1, uid) => {
    console.log(uid);
    fetch(`${BASE_URL}user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, uid }),
    })
      .then((res) => res.text()) // or res.json()
      .then(async (res) => {
        let re = JSON.parse(res);
      });
  };

  deleteUser = async (uid) => {
    console.log(uid);
    fetch(`${BASE_URL}user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }),
    })
      .then((res) => res.text()) // or res.json()
      .then(async (res) => {
        let re = JSON.parse(res);
      });
  };

  render() {
    var lenght = 0;
    let product = this.state.data;
    return (
      <React.Fragment>
        <Header
          name={this.state.name}
          noOfProducts={this.state.ProdSearch.length}
          totalValue={this.state.totalValue}
          type={"Roles"}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Manage Roles</h3>
                </CardHeader>

                <CardBody>
                  {this.state.isLoading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flex: "1",
                        textAlign: "center",
                      }}
                    >
                      <Spinner style={{ width: "3rem", height: "3rem" }} />
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                        }}
                      >
                        <input
                          style={{
                            borderRadius: 5,
                            padding: 7,
                            margin: 10,
                            marginLeft: 15,
                            border: "1px solid #139152",
                          }}
                          type="text"
                          placeholder="Search..."
                          value={this.state.search}
                          onChange={(e) => this.handleChange(e.target.value)}
                        />
                        <Button
                          color="success"
                          style={{
                            width: "20%",
                            textAlign: "center",
                            marginLeft: "53%",
                          }}
                          onClick={() => this.addmodal()}
                        >
                          Add New
                        </Button>
                      </div>

                      <Table
                        style={{ marginTop: 20 }}
                        id="test"
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(product).map((key) => {
                            const row = product[key];
                            return (
                              <TableRow
                                key={key}
                                id={key}
                                {...row}
                                Buttondisabled={this.state.Buttondisabled}
                                deletemodal={this.deletemodal}
                                detail={this.detail}
                                approve={this.approve}
                                edit={this.editUser}
                                remove={this.delete}
                              />
                            );
                          })}
                        </tbody>
                      </Table>
                    </>
                  )}
                </CardBody>
              </Card>
              {this.state.alert}
            </div>
            <Modal
              style={{ height: "50%", width: "50%" }}
              isOpen={this.state.modalvisible}
              toggle={() =>
                this.setState({
                  modalvisible: !this.state.modalvisible,
                  item: {},
                  pics: [],
                })
              }
              className={this.props.className}
            >
              <ModalBody>
                <Row>
                  {console.log(this.state.pics)}
                  <Col sm="12" md={{ size: 3, offset: 4 }}>
                    <img
                      width={100}
                      height={100}
                      style={{ borderRadius: 100 }}
                      src={this.state.item.picture}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        padding: 15,
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.item.fullname}
                    </div>
                  </Col>
                  <Col style={{ height: 10 }} md={12} />
                  <Col>
                    {this.state.pics.map((item) => {
                      return (
                        <Col xs="6" sm="4">
                          <div
                            style={{
                              padding: 15,
                              marginLeft: "35%",
                              fontWeight: "bold",
                            }}
                          >
                            {item.name}
                          </div>
                          <img width={420} height={300} src={item.picture} />
                        </Col>
                      );
                    })}
                  </Col>
                  <Col style={{ height: 10 }} md={12} />
                  {/* <Col md = {4} /> */}
                  <Col sm="8" md={{ size: 3, offset: 4 }}>
                    <Button
                      color="info"
                      onClick={() =>
                        this.setState({
                          modalvisible: !this.state.modalvisible,
                          item: {},
                          pics: [],
                        })
                      }
                    >
                      Close
                    </Button>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Tables;
