import React from "react";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody,
  Spinner,
} from "reactstrap";
import Pagination from "react-js-pagination";
import Header from "../components/Headers/Header.jsx";
import TableUsers from "../components/Tables/TableUsers";
import { getAllCustomersApi } from "../utils/ApiManager.js";
class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.getUSers();
  };

  getUSers = async (q, page) => {
    getAllCustomersApi({ q: q ?? this.state.search, page: q ? 1 : page }).then(
      (res) => {
        if (res?.success) {
          const { currentPage, totalPages, customers, total } = res;
          this.setState({
            data: customers,
            currentPage,
            totalPages,
            total,
          });
        }
        this.setState({
          isLoading: false,
        });
      }
    );
  };
  //modals

  handleChange = (value) => {
    this.setState({ search: value });
    this.getUSers(value);
  };
  handlePageChange = (page) => {
    this.getUSers("", page);
  };
  render() {
    let tyres = this.state.data;
    return (
      <React.Fragment>
        <Header
          name={this.state.name}
          noOfProducts={this.state.total}
          totalValue={this.state.totalValue}
          type={"Customers"}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Customers</h3>
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
                      <Row>
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
                      </Row>
                      <Table
                        id="test"
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Image</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Rating⭐</th>
                            <th scope="col">Verify/UnVerify</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tyres &&
                            tyres.map((item) => {
                              return <TableUsers key={item.id} user={item} />;
                            })}
                        </tbody>
                      </Table>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          marginTop: "10px",
                        }}
                      >
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={this.state.currentPage}
                          itemsCountPerPage={10}
                          totalItemsCount={this.state.total}
                          pageRangeDisplayed={10}
                          onChange={this.handlePageChange}
                        />
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
              {this.state.alert}
            </div>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Users;
