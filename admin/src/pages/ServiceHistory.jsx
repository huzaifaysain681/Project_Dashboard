import React from "react";

import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody,
  Spinner,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Pagination from "react-js-pagination";
import Header from "../components/Headers/Header.jsx";
import TableServiceHistory from "../components/Tables/TableServiceHistory";
import { getAllBookingsApi } from "../utils/ApiManager.js";
class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: [],
      isLoading: true,
      type: "ongoing",
    };
  }

  componentDidMount = async () => {
    await this.getServices("", 1, "ongoing");
  };

  getServices = async (q, page, type) => {
    if (type) this.setState({ type });
    getAllBookingsApi({
      q: q ?? this.state.search,
      page: q ? 1 : page,
      type,
    }).then((res) => {
      if (res?.success) {
        const { currentPage, totalPages, bookings, total } = res;
        this.setState({
          data: bookings,
          currentPage,
          totalPages,
          total,
        });
      }
      this.setState({
        isLoading: false,
      });
    });
  };
  //modals

  handleChange = (value) => {
    this.setState({ search: value });
    this.getServices(value);
  };
  handlePageChange = (page) => {
    this.getServices("", page);
  };
  render() {
    let tyres = this.state.data;
    return (
      <React.Fragment>
        <Header
          name={this.state.name}
          noOfProducts={this.state.total}
          totalValue={this.state.totalValue}
          type={"Technicians"}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                  <Nav>
                    <NavItem>
                      <NavLink
                        onClick={() => this.getServices("", 1, "ongoing")}
                        href="#"
                        style={
                          this.state.type == "ongoing"
                            ? { color: "#139152" }
                            : {}
                        }
                      >
                        On Going
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        onClick={() => this.getServices("", 1, "schedule")}
                        style={
                          this.state.type == "schedule"
                            ? { color: "#139152" }
                            : {}
                        }
                        href="#"
                      >
                        Scheduled
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={
                          this.state.type == "all" ? { color: "#139152" } : {}
                        }
                        onClick={() => this.getServices("", 1, "all")}
                        href="#"
                      >
                        All
                      </NavLink>
                    </NavItem>
                  </Nav>
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
                          display: "flex",
                          justifyContent: "space-between",
                          paddingBottom: 20,
                          alignItems: "center",
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
                      </div>
                      <Table
                        id="test"
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Services</th>
                            <th scope="col">Job Status</th>
                            <th scope="col">Price</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Provider</th>
                            <th scope="col">Customer Review⭐</th>
                            <th scope="col">Provider Review⭐</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tyres &&
                            tyres.map((item) => {
                              return (
                                <TableServiceHistory
                                  key={item.id}
                                  serviceHist={item}
                                />
                              );
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
