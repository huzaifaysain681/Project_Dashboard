import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import EditServices from "../components/Modals/EditServices";
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
function Services() {
  const [state, setState] = useState({
    search: "",
    data: null,
    isLoading: true,
    showEditModal: false,
    seletedData: null,
    alert: null,
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = (params) => {
    getApi("services/detail", params).then((res) => {
      if (res?.success) {
        setState((s) => ({ ...s, isLoading: false, data: res?.data }));
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
            patchApi("services/detail", item).then((res) => {
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
  return (
    <>
      <Header
        name={"Services"}
        noOfProducts={state?.data?.length}
        totalValue={"10"}
        type={"Services"}
      />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Services</h3>
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
                          Add service
                        </Button>
                      </Col>
                    </Row>
                    <Table
                      style={{ marginTop: 15 }}
                      id="test"
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Edit</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.data &&
                          state.data.map((type) => {
                            return (
                              <tr key={type._id}>
                                <th scope="col">{type?.name}</th>
                                <th scope="col">{type?.type}</th>
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
                    {state.data && state.data.length === 0 && (
                      <p
                        style={{
                          fontWeight: "700",
                          textAlign: "center",
                          display: "block",
                          color: "#888",
                        }}
                      >
                        No Services Found
                      </p>
                    )}{" "}
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </Row>
        {state.showEditModal && (
          <EditServices
            show={state.showEditModal}
            onHide={() => {
              getData();
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

export default Services;
