import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Table, Button, Row } from "react-bootstrap";
import { getApi, postApi, putApi } from "../../utils/ApiManager";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "reactstrap";
const expression =
  /(?!.*\.{2})^([a-z\d!#$%&‘*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&‘*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|“((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?“)@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const EmailsModel = ({ ...props }) => {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    getDate();
  }, []);
  const getDate = async () => {
    var res = await getApi("bookings/email");
    if (res?.success) {
      setProducts(res?.data);
    }
  };
  const assign = (item, index) => {
    setLoading("delete" + index);
    putApi("bookings/email", { _id: item._id }).then((res) => {
      setLoading("");
      if (res?.success) {
        getDate();
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
    });
  };
  const add = () => {
    var emai = email.toLowerCase().trim();
    if (!expression.test(emai)) return;
    setLoading("add");
    postApi("bookings/email", { email: emai }).then((res) => {
      setLoading("");
      if (res?.success) {
        setEmail("");
        getDate();
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
    });
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Row>
          <Input
            style={{ width: "50%" }}
            placeholder="Add New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            disabled={loading == "add"}
            onClick={add}
            style={{ marginLeft: "25%" }}
          >
            {loading == "add" ? "Loading..." : "Add"}
          </Button>
        </Row>
        <Table id="test" className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr>
                  <th scope="col">{product.email}</th>
                  <th scope="col">
                    <Button
                      disabled={loading == "delete" + index}
                      onClick={() => assign(product, index)}
                      color="success"
                    >
                      {loading == "delete" + index ? "Loading..." : "Delete"}
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

export default EmailsModel;
