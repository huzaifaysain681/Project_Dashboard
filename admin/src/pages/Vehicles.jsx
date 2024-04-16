import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import EditVehicle from "../components/Modals/EditVehicle";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  CardBody,
  Spinner,
  Button,
  Col,
} from "reactstrap";
import { getApi, patchApi } from "../utils/ApiManager";
import { BASE } from "../utils/config";
import SweetAlert from "react-bootstrap-sweetalert";
import { InputGroup, FormControl } from "react-bootstrap";
import Pagination from "react-js-pagination";
function Vehicles() {
  const [state, setState] = useState({
    search: "",
    data: null,
    isLoading: true,
    showEditModal: false,
    seletedData: null,
    alert: null,
    vehicleTypes: [],
    type: "",
  });
  useEffect(() => {
    getData();
    getApi("vehicle-type/detail").then((res) => {
      if (res?.success) {
        setState((s) => ({ ...s, isLoading: false, vehicleTypes: res?.data }));
      }
    });
  }, []);
  const getData = (params) => {
    getApi("vehicles/detail", params).then((res) => {
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
  const openEditModal = (service) => {
    setState((s) => ({ ...s, showEditModal: true, seletedData: service }));
  };
  const closeEditModal = () => {
    setState((s) => ({ ...s, showEditModal: false, seletedData: null }));
  };
  const deleteSubService = (item) => {
    setState((s) => ({
      ...s,
      alert: (
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Delete !`}
          onConfirm={() => {
            patchApi("vehicles/detail", item).then((res) => {
              if (res?.success) {
                getData();
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
    getData({ page: nextPage, q: state.search, type: state.type });
  };
  useEffect(() => {
    if (state.type) getData({ page: 1, q: state.search, type: state.type });
  }, [state.type]);
  return (
    <>
      <Header
        name={"Vehicles"}
        noOfProducts={state?.total}
        totalValue={"10"}
        type={"Vehicles"}
      />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Vehicles</h3>
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
                    <Row>
                      <Col>
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
                          onChange={(e) => getData({ q: e.target.value })}
                        />
                      </Col>
                      <Col>
                        <Button
                          onClick={() => openEditModal(null)}
                          color="info"
                        >
                          Add Vehicle
                        </Button>
                      </Col>
                    </Row>
                    <InputGroup
                      size="sm"
                      style={{ width: 200 }}
                      className="m-1"
                    >
                      <FormControl
                        size="sm"
                        className="pl-1"
                        as="select"
                        aria-describedby="type"
                        defaultValue={state.type}
                        onChange={(e) =>
                          setState((s) => ({ ...s, type: e.target.value }))
                        }
                      >
                        <option value={null}>Select Vehicle Type</option>
                        {state.vehicleTypes &&
                          state.vehicleTypes.map((item) => (
                            <option value={item._id}>{item?.name}</option>
                          ))}
                      </FormControl>
                    </InputGroup>
                    <Table
                      style={{ marginTop: 15 }}
                      id="test"
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Color</th>
                          <th scope="col">Plate #</th>
                          <th scope="col">Make</th>
                          <th scope="col">Model</th>
                          <th scope="col">Year</th>
                          <th scope="col">Type</th>
                          <th scope="col">Status</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.data &&
                          state.data.map((type) => {
                            return (
                              <tr key={type._id}>
                                <th scope="col">{type?.color}</th>
                                <th scope="col">{type?.plateNo}</th>
                                <th scope="col">{type?.make}</th>
                                <th scope="col">{type?.model}</th>
                                <th scope="col">{type?.year}</th>
                                <th scope="col">{type?.type?.name}</th>
                                <th scope="col">{type?.status}</th>
                                <th scope="col">
                                  <Button
                                    onClick={() => openEditModal(type)}
                                    color="info"
                                  >
                                    Edit
                                  </Button>
                                </th>
                                <th scope="col">
                                  <Button
                                    onClick={() => deleteSubService(type)}
                                    color="danger"
                                  >
                                    Delete
                                  </Button>
                                </th>
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
                        No Vehicle Found
                      </p>
                    )}{" "}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>
        {state.showEditModal && (
          <EditVehicle
            show={state.showEditModal}
            vehicleTypes={state.vehicleTypes}
            onHide={() => {
              getData({
                page: state.currentPage,
                q: state.search,
                type: state.type,
              });
              closeEditModal();
            }}
            service={state.seletedData}
          />
        )}
      </Container>
      {state.alert}
    </>
  );
}

export default Vehicles;
