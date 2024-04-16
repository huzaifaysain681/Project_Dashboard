import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { postApi, putApi } from "../../utils/ApiManager";
const EditServiceModal = ({ service, ...props }) => {
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({
    name: service?.name || "",
  });
  useEffect(() => {
    setState({
      name: service?.name || "",
    });
  }, [service]);
  const onChangeText = (value, key) => {
    setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const addService = () => {
    if (!state.name) return;
    setDisabled(true);
    postApi("vehicle-type/detail", state).then((res) => {
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
  const updateService = () => {
    if (!state.name) return;
    setDisabled(true);
    putApi("vehicle-type/detail", { _id: service?._id, ...state }).then(
      (res) => {
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
      }
    );
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
