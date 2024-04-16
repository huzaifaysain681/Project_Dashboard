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
import Header from "../components/Headers/Header.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import TableOrderTyres from "../components/Tables/TableTyreOrder";
import OrderDetails from "../components/Modals/OrderDetails";
import ConfirmModal from "../components/Modals/ConfirmModal";

const excludeColumns = ["id", "color"];
class TyresOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: [],
      alert: null,
      ProdSearch: [],
      selectedOrder: null,
      showViewTyreModal: false,
      showEditTyreModal: false,
      showConfirmModal: false,
      showOrderDetails: false,
      isLoading: true,
      dummyData: [
        {
          orderid: 1,
          customer: {
            name: "John Doe",
            address: "Street# 45, Xyz",
          },
          date: "22/12/2020",
          bill: 351.92,
          status: 1,
          products: [
            {
              id: 1,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
            {
              id: 2,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
          ],
        },
        {
          orderid: 2,
          customer: {
            name: "John Doe",
            address: "Street# 45, Xyz",
          },
          date: "22/12/2020",
          bill: 351.92,
          status: 5,
          products: [
            {
              id: 1,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
            {
              id: 2,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
          ],
        },
        {
          orderid: 3,
          customer: {
            name: "John Doe",
            address: "Street# 45, Xyz",
          },
          date: "22/12/2020",
          bill: 351.92,
          status: 3,
          products: [
            {
              id: 1,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
            {
              id: 2,
              title: "CrossContact LX22",
              description: "lorem ipsum asdas dsa a",
              images: [
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
                "https://pngimg.com/uploads/tire/tire_PNG7.png",
              ],
              stock: 14,
              sold: 2,
              price: 175.96,
              discount: 10,
              type: "new",
              sizes: [10, 12, 14],
              partNo: "154980",
              utqg: "740AB",
              sidewall: "OWL",
              loadRange: "B (4 Piy)",
              tradeLifeWarrenty: "7000 miles",
            },
          ],
        },
      ],
    };
  }

  componentDidMount = async () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
    await this.getTyres();
  };

  //Async
  getTyres = async () => {};
  //modals

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

  //states
  view = (data) => {
    this.setState({ selectedOrder: data, showOrderDetails: true });
  };
  changeStatus = (data) => {
    this.setState({ selectedOrder: data, showConfirmModal: true });
  };

  handleChange = (value) => {
    this.setState({ search: value });
    this.filterData(value);
  };

  //misc func
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

  render() {
    // let tyres = this.state.data
    let order = this.state.dummyData;
    return (
      <React.Fragment>
        <Header
          name={this.state.name}
          noOfProducts={order.length}
          totalValue={this.state.totalValue}
          type={"Orders"}
        />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="bg-secondary shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Tyre Orders</h3>
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
                      <Table
                        id="test"
                        className="align-items-center table-flush"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Order#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Address</th>
                            <th scope="col">No of Products</th>
                            <th scope="col">Bill</th>
                            <th scope="col">Update Status</th>
                            <th scope="col">View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order &&
                            order.map((item) => {
                              return (
                                <TableOrderTyres
                                  key={item.id}
                                  order={item}
                                  view={(item) => this.view(item)}
                                  changeStatus={(item) =>
                                    this.changeStatus(item)
                                  }
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
          </Row>
        </Container>
        {this.state.showConfirmModal && this.state.selectedOrder && (
          <ConfirmModal
            show={
              this.state.showConfirmModal && this.state.selectedOrder.status < 5
            }
            onHide={() =>
              this.setState({
                showOrderDetails: false,
                showConfirmModal: false,
              })
            }
            status={
              this.state.selectedOrder.status === 1
                ? "Change order status to Confirm Order?"
                : this.state.selectedOrder.status === 2
                ? "Change order status to Process Order?"
                : this.state.selectedOrder.status === 3
                ? "Change order status to Order Shipped?"
                : this.state.selectedOrder.status === 4
                ? "Change order status to Complete Order?"
                : this.state.selectedOrder.status === 5 && "Order Completed"
            }
          />
        )}
        {this.state.showOrderDetails && this.state.selectedOrder && (
          <OrderDetails
            show={this.state.showOrderDetails}
            onHide={() =>
              this.setState({
                showOrderDetails: false,
                showConfirmModal: false,
              })
            }
            products={this.state.selectedOrder.products}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TyresOrder;
