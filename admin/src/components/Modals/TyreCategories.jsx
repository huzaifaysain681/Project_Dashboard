import React, { useEffect, useState } from "react";
import { Modal, Table, InputGroup, FormControl } from "react-bootstrap";
import {
  addTyreCategories,
  deleteTyreCategories,
  getTyreCategory,
  updateTyreCategories,
} from "../../utils/ApiManager";
import { Button } from "reactstrap";
import OrderDetails from "./OrderDetails";
import SweetAlert from "react-bootstrap-sweetalert";

const TyreCategories = (props) => {
  const [data, setData] = useState([]);
  const [isediting, setIsediting] = useState(false);
  const [cat, setCat] = useState(null);
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(null);
  useEffect(() => {
    getTyreCategory().then((res) => {
      if (res?.success) {
        setData(res?.categories);
      }
    });
  }, []);
  useEffect(() => {
    setName("");
  }, [isediting]);
  const deleteCat = (_id) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "100px" }}
        title={"Do you want to delete category!"}
        onConfirm={() => {
          deleteTyreCategories({ _id }).then((res) => {
            setAlert(null);
            if (res?.success) {
              setData((d) => d.filter((d) => d._id != _id));
            }
          });
        }}
        onCancel={() => setAlert(null)}
        confirmBtnBsStyle="danger"
        showCancel={true}
        confirmBtnText="Yes"
      ></SweetAlert>
    );
  };
  const submit = () => {
    console.log(name, cat);
    if (String(name).trim()) {
      if (!cat) {
        addTyreCategories({ name: String(name).trim() }).then((res) => {
          if (res?.success) {
            setData((d) => [...d, res?.category]);
          }
        });
      } else {
        updateTyreCategories({ ...cat, name: String(name).trim() }).then(
          (res) => {
            if (res?.success) {
              setData((d) => {
                var temp = [...d];
                var index = temp.findIndex((i) => i._id == cat._id);
                temp[index].name = String(name).trim();
                return temp;
              });
            }
          }
        );
      }
      setName("");
      setIsediting((a) => !a);
      setCat(null);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          {!isediting && "Categories"}
          <Button
            onClick={() => {
              setName("");
              setIsediting((a) => !a);
              setCat(null);
            }}
            color="success"
          >
            {isediting ? "Back" : "Add New"}
          </Button>
        </Modal.Header>
        <Modal.Body>
          {!isediting ? (
            <Table
              id="test"
              className="align-items-center table-flush"
              responsive
            >
              <thead className="thead-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  {/* <th scope="col">Details</th> */}
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <tr key={item._id}>
                      <td> {item.name}</td>
                      <th>
                        <Button
                          onClick={() => {
                            setName(item.name);
                            setCat(item);
                            setIsediting(true);
                          }}
                          color="info"
                        >
                          Edit
                        </Button>
                      </th>
                      <th>
                        <Button
                          onClick={() => deleteCat(item._id)}
                          color="danger"
                        >
                          Delete
                        </Button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          ) : (
            <>
              <InputGroup className="m-1">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    style={{ background: "#139152", color: "#fff" }}
                  >
                    Name
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="pl-2"
                  aria-describedby="name"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
              <Button onClick={submit} color="info">
                {cat ? "Update" : "Submit"}
              </Button>
            </>
          )}
        </Modal.Body>
        {alert}
      </Modal>
    </>
  );
};

export default TyreCategories;
