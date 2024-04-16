import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import EditServices from "../components/Modals/EditServices";
import DriverListModal from "../components/Modals/DriverListModal";
import VehicleListModal from "../components/Modals/VehicleListModal";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody,
  Spinner,
  Button,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { getApi, patchApi, putApi } from "../utils/ApiManager";
import { BASE } from "../utils/config";
import moment from "moment";
import classnames from "classnames";
import SweetAlert from "react-bootstrap-sweetalert";
import Pagination from "react-js-pagination";
import EmailsModel from "../components/Modals/EmailsModel";
function Bookings() {
  const [state, setState] = useState({
    search: "",
    data: null,
    isLoading: true,
    activeTab: "pending",
    seletedData: null,
    alert: null,
    getDriverId: null,
    getVehicleId: null,
  });
  const [email, setEmail] = useState(false);
  useEffect(() => {
    getData({ status: "pending" });
  }, []);
  const getData = (params) => {
    getApi("bookings/detail", params).then((res) => {
      if (res?.success) {
        var { total, totalPages, currentPage } = res;
        setState((s) => ({
          ...s,
          isLoading: false,
          data: res?.data,
          total,
          totalPages,
          currentPage,
        }));
      }
    });
  };
  const deleteSubService = (item, accept) => {
    setState((s) => ({
      ...s,
      alert: (
        <SweetAlert
          danger={accept ? false : true}
          success={!accept ? false : true}
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Confirm request !`}
          onConfirm={() => {
            putApi("bookings/detail", {
              ...item,
              status: accept ? "accepted" : "declined",
            }).then((res) => {
              if (res?.success) {
                getData({
                  type: state.type,
                  page: state.currentPage,
                  q: state.search,
                  status: state.activeTab,
                });
                setState((s) => ({ ...s, alert: null }));
              } else {
                setState((s) => ({
                  ...s,
                  alert: (
                    <SweetAlert
                      danger
                      style={{ display: "block", marginTop: "100px" }}
                      title={res?.message || `Network error !`}
                      onConfirm={() => setState((s) => ({ ...s, alert: null }))}
                      confirmBtnBsStyle="danger"
                      showCancel={false}
                      confirmBtnText="Ok"
                    ></SweetAlert>
                  ),
                }));
              }
            });
          }}
          onCancel={() => setState((s) => ({ ...s, alert: null }))}
          confirmBtnBsStyle="danger"
          showCancel
          confirmBtnText="Yes"
        ></SweetAlert>
      ),
    }));
  };

  const handlePageChange = (nextPage) => {
    getData({
      page: nextPage,
      q: state.search,
      type: state.type,
      status: state.activeTab,
    });
  };
  return (
    <>
      <Header
        name={"Bookings"}
        noOfProducts={state?.data?.length}
        totalValue={"10"}
        type={"Bookings"}
      />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Bookings</h3>
              </CardHeader>
              <CardBody>
                {state.isLoading ? (
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
                    <Nav tabs>
                      {["pending", "accepted", "declined", "completed"].map(
                        (item) => {
                          return (
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: state.activeTab == item,
                                })}
                                onClick={() => {
                                  setState((s) => ({ ...s, activeTab: item }));
                                  getData({
                                    status: item,
                                    page: state.currentPage,
                                    q: state.search,
                                  });
                                }}
                              >
                                {item}
                              </NavLink>
                            </NavItem>
                          );
                        }
                      )}
                    </Nav>
                    <Button
                      style={{ marginLeft: "60%", marginTop: 15 }}
                      onClick={() => setEmail(true)}
                      color="success"
                    >
                      Add Emails Of VC
                    </Button>
                    <Table
                      style={{ marginTop: 15 }}
                      id="test"
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Phone</th>
                          <th scope="col">User Email</th>
                          <th scope="col">Date From</th>
                          <th scope="col">Date To</th>
                          <th scope="col">Name</th>
                          <th scope="col">Department</th>
                          <th scope="col">Faculty</th>
                          <th scope="col">Purpose</th>
                          <th scope="col">Place</th>
                          {state.activeTab == "accepted" ? (
                            <>
                              <th scope="col">Driver</th>
                              <th scope="col">Vehicle</th>
                            </>
                          ) : null}
                          {state.activeTab == "pending" ? (
                            <>
                              <th scope="col">Accept</th>
                              <th scope="col">Decline</th>
                            </>
                          ) : null}
                        </tr>
                      </thead>
                      <tbody>
                        {state.data &&
                          state.data.map((type) => {
                            return (
                              <tr key={type._id}>
                                <th scope="col">{type?.user?.phone}</th>
                                <th scope="col">{type?.user?.email}</th>
                                <th scope="col">
                                  {moment(type?.dateFrom).format(
                                    "MMM DD YYYY HH:mm"
                                  )}
                                </th>
                                <th scope="col">
                                  {moment(type?.dateTo).format(
                                    "MMM DD YYYY HH:mm"
                                  )}
                                </th>
                                <th scope="col">{type?.name}</th>
                                <th scope="col">{type?.department}</th>
                                <th scope="col">{type?.faculty}</th>
                                <th scope="col">{type?.purpose}</th>
                                <th scope="col">{type?.place}</th>
                                {state.activeTab == "accepted" && (
                                  <th scope="col">
                                    <Button
                                      onClick={() =>
                                        setState((s) => ({
                                          ...s,
                                          getDriverId: type,
                                        }))
                                      }
                                      color="success"
                                    >
                                      {type?.assignedDriver
                                        ? "Change Driver"
                                        : //+ type.assignedDriver?.name
                                          "Assign Driver"}
                                    </Button>
                                  </th>
                                )}
                                {state.activeTab == "accepted" && (
                                  <th scope="col">
                                    <Button
                                      onClick={() =>
                                        setState((s) => ({
                                          ...s,
                                          getVehicleId: type,
                                        }))
                                      }
                                      color="warning"
                                    >
                                      {type?.assignedVehicle
                                        ? "Change Vehicle"
                                        : // ? "Change " + type.assignedVehicle?.name
                                          "Assign Vehicle"}
                                    </Button>
                                  </th>
                                )}
                                {state.activeTab == "pending" && (
                                  <th scope="col">
                                    <Button
                                      onClick={() =>
                                        deleteSubService(type, true)
                                      }
                                      color="info"
                                    >
                                      Accept
                                    </Button>
                                  </th>
                                )}
                                {state.activeTab == "pending" && (
                                  <th scope="col">
                                    <Button
                                      onClick={() => deleteSubService(type)}
                                      color="danger"
                                    >
                                      Decline
                                    </Button>
                                  </th>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                    <Pagination
                      itemClass="page-item"
                      linkClass="page-link"
                      activePage={state.currentPage}
                      itemsCountPerPage={10}
                      totalItemsCount={state.total}
                      pageRangeDisplayed={3}
                      onChange={handlePageChange}
                    />
                    {state.data && state.data.length === 0 && (
                      <p
                        style={{
                          fontWeight: "700",
                          textAlign: "center",
                          display: "block",
                          color: "#888",
                        }}
                      >
                        No bookings Found
                      </p>
                    )}{" "}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>

        {state.getDriverId && (
          <DriverListModal
            show={state.getDriverId ? true : false}
            onHide={() => {
              getData({
                type: state.type,
                page: state.currentPage,
                q: state.search,
                status: state.activeTab,
              });
              setState((s) => ({
                ...s,
                getDriverId: null,
              }));
            }}
            {...state.getDriverId}
          />
        )}
        {state.getVehicleId && (
          <VehicleListModal
            show={state.getVehicleId ? true : false}
            onHide={() => {
              getData({
                type: state.type,
                page: state.currentPage,
                q: state.search,
                status: state.activeTab,
              });
              setState((s) => ({
                ...s,
                getVehicleId: null,
              }));
            }}
            {...state.getVehicleId}
          />
        )}
        {email && (
          <EmailsModel
            show={email}
            onHide={() => {
              setEmail(false);
            }}
          />
        )}
      </Container>
      {state.alert}
    </>
  );
}

export default Bookings;
