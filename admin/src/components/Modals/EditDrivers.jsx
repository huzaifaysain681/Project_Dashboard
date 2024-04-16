import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Input } from "reactstrap";
import { postApi, putApi } from "../../utils/ApiManager";
const eye =
  "data:image/png;base64,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";
const hidden =
  "https://www.kindpng.com/picc/m/327-3273865_password-eye-icon-png-transparent-png.png";
const EditServiceModal = ({ service, ...props }) => {
  const [alert, setAlert] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({
    name: service?.name || "",
    email: service?.email || "",
    phone: service?.phone || "",
    username: service?.username || "",
    password: service?.username || "",
    cpassword: service?.username || "",
  });
  useEffect(() => {
    setState({
      name: service?.name || "",
      email: service?.email || "",
      phone: service?.phone || "",
      username: service?.username || "",
      password: service?.username || "",
      cpassword: service?.username || "",
    });
  }, [service]);
  const onChangeText = (value, key) => {
    setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const addService = () => {
    if (!state.name && !state.email && !state.username && !state.password)
      return;
    if (state.password != state.cpassword)
      return setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={"Password does not matched!"}
          onConfirm={() => setAlert(null)}
          confirmBtnBsStyle="danger"
          showCancel={false}
          confirmBtnText="Ok"
        ></SweetAlert>
      );
    setDisabled(true);
    postApi("user/driver-signup", state).then((res) => {
      setDisabled(false);
      if (res?.success) {
        props.onHide();
      } else {
        console.log(res);
        setAlert(
          <SweetAlert
            danger
            style={{ display: "block", marginTop: "100px" }}
            title={res?.message || "Network Error!"}
            onConfirm={() => setAlert(null)}
            confirmBtnBsStyle="danger"
            showCancel={false}
            confirmBtnText="Ok"
          ></SweetAlert>
        );
      }
    });
  };
  const updateService = () => {
    if (!state.name && !state.email) return;
    setDisabled(true);
    putApi("user/driver", {
      user: service?.user,
      name: state.name,
      email: state.email,
      phone: state.phone,
    }).then((res) => {
      setDisabled(false);
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
    });
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <>
          <div style={styles.container}>
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
                aria-describedby="Name"
                defaultValue={state.name}
                placeholder="Name"
                onChange={(e) => onChangeText(e.target.value, "name")}
              />
            </InputGroup>

            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Phone
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Phone"
                defaultValue={state.phone}
                placeholder="Phone"
                onChange={(e) => onChangeText(e.target.value, "phone")}
              />
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Email
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Email"
                defaultValue={state.email}
                placeholder="Email"
                onChange={(e) => onChangeText(e.target.value, "email")}
              />
            </InputGroup>
            {!service?._id && (
              <InputGroup className="m-1">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    style={{ background: "#139152", color: "#fff" }}
                  >
                    Username
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  className="pl-2"
                  aria-describedby="Username"
                  defaultValue={state.username}
                  placeholder="Username"
                  onChange={(e) => onChangeText(e.target.value, "username")}
                />
              </InputGroup>
            )}
            {!service?._id && (
              <InputGroup className="m-1">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    style={{ background: "#139152", color: "#fff" }}
                  >
                    Password
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type={show ? "text" : "password"}
                  className="pl-2"
                  aria-describedby="Password"
                  defaultValue={state.password}
                  placeholder="Password"
                  onChange={(e) => onChangeText(e.target.value, "password")}
                />
                <InputGroup.Append>
                  <img
                    onClick={() => setShow((s) => !s)}
                    style={{ width: 30, height: 25, marginTop: 10 }}
                    src={show ? eye : hidden}
                  />
                </InputGroup.Append>
              </InputGroup>
            )}
            {!service?._id && (
              <InputGroup className="m-1">
                <InputGroup.Prepend>
                  <InputGroup.Text
                    style={{ background: "#139152", color: "#fff" }}
                  >
                    Confirm Password
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  type={show1 ? "text" : "password"}
                  type="password"
                  className="pl-2"
                  aria-describedby="Password"
                  defaultValue={state.cpassword}
                  placeholder="Password"
                  onChange={(e) => onChangeText(e.target.value, "cpassword")}
                />
                <InputGroup.Append>
                  <img
                    onClick={() => setShow1((s) => !s)}
                    style={{
                      width: 30,
                      height: 25,
                      marginTop: 10,
                    }}
                    src={show1 ? eye : hidden}
                  />
                </InputGroup.Append>
              </InputGroup>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                disabled={disabled}
                onClick={(e) => {
                  e.preventDefault();
                  if (service?._id) {
                    updateService();
                  } else {
                    addService();
                  }
                }}
                style={{ ...styles.button, width: "50%" }}
              >
                {disabled ? "Loading ..." : service?._id ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </>
      </Modal.Body>
      {alert}
    </Modal>
  );
};

export default EditServiceModal;

const styles = {
  image: {
    height: "150px",
    width: "150px",
    objectFit: "contain",
  },
  container: {
    marginTop: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
  },
  textred: {
    color: "#139152",
    fontWeight: "bold",
    padding: 0,
    marginTop: "-8px",
  },
  discount: {
    textDecoration: "line-through",
    color: "#666",
    fontWeight: "normal",
    marginLeft: "10px",
  },
  infoblock: {
    marginTop: "10px",
  },
  textnormal: {
    color: "#666",
    fontWeight: "normal",
  },
  typebox: {
    padding: "4px 20px",
    backgroundColor: "#2831b6",
    color: "#fff",
    borderRadius: "8px",
    border: 0,
    marginLeft: "30px",
  },
  edit: {
    margin: " 5px",
    borderRadius: 5,
    padding: 7,
    border: "1px solid #139152",
  },
  Hflex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    width: "20px",
    height: "20px",
    backgroundColor: "#139152",
    borderRadius: 5,
    cursor: "pointer",
    margin: "3px 5px",
  },
  unchecked: {
    width: "20px",
    height: "20px",
    border: "1px solid #139152",
    borderRadius: 5,
    cursor: "pointer",
    margin: "3px 5px",
  },
  button: {
    background: "#139152",
    borderRadius: 4,
    border: 0,
    color: "#fff",
    padding: "5px",
    marginLeft: "5px",
    cursor: "pointer",
  },
  removeIc: {
    position: "absolute",
    top: 0,
    rigth: 0,
    width: "15px",
    height: "15px",
    borderRadius: "100%",
    border: 0,
    backgroundColor: "#139152",
    color: "#fff",
    textAlign: "center",
    cursor: "pointer",
    display: "inline-block	",
  },
};
