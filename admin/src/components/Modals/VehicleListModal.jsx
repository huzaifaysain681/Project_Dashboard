import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { postApi } from "../../utils/ApiManager";
import SweetAlert from "react-bootstrap-sweetalert";
import TableViewOrder from "../Tables/TableViewOrderDetails";
const OrderDetails = ({ dateFrom, dateTo, _id, vehicleType, ...props }) => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    getDate();
  }, []);
  const getDate = async () => {
    var res = await postApi("bookings/get-available-vehicle", {
      dateFrom,
      dateTo,
      vehicleType: vehicleType?._id,
    });
    if (res?.success) {
      setProducts(res?.data);
    }
  };
  const assign = (item) => {
    postApi("bookings/assign-vehicle", { _id, vehicleId: item._id }).then(
      (res) => {
        if (res?.success) {
          props.onHide();
        } else {
          setAlert(
            <SweetAlert
              danger
              style={{ display: "block", marginTop: "100px" }}
              title={res?.message || res?.error || "Network Error!"}
              onConfirm={() => setAlert(null)}
              confirmBtnBsStyle="danger"
              showCancel={false}
              confirmBtnText="Ok"
            ></SweetAlert>
          );
        }
      }
    );
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Table id="test" className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Plate #</th>
              <th scope="col">Assign</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr>
                  <th scope="col">
                    {product.make +
                      " - " +
                      product.model +
                      " - " +
                      product.year +
                      " - " +
                      product.color}
                  </th>
                  <th scope="col">{vehicleType.name}</th>
                  <th scope="col">{product.plateNo}</th>
                  <th scope="col">
                    <Button onClick={() => assign(product)} color="success">
                      Assign
                    </Button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
      {alert}
    </Modal>
  );
};

export default OrderDetails;