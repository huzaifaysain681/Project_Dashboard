import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { postApi, putApi } from "../../utils/ApiManager";
import colors from "../../utils/colors.json";
const EditServiceModal = ({ service, vehicleTypes, ...props }) => {
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [state, setState] = useState({
    color: service?.color || "",
    plateNo: service?.plateNo || "",
    make: service?.make || "",
    model: service?.model || "",
    year: service?.year || "",
    type: service?.type?._id || "",
  });

  useEffect(() => {
    setState({
      color: service?.color || "",
      plateNo: service?.plateNo || "",
      type: service?.type?._id || "",
      make: service?.make || "",
      model: service?.model || "",
      year: service?.year || "",
    });
  }, [service]);
  const onChangeText = (value, key) => {
    setState((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const addService = () => {
    if (
      !state.color ||
      !state.type ||
      !state.make ||
      !state.model ||
      !state.year
    )
      return;
    setDisabled(true);
    postApi("vehicles/detail", state).then((res) => {
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
    if (!state.color && !state.type) return;
    setDisabled(true);
    putApi("vehicles/detail", { _id: service?._id, ...state }).then((res) => {
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
                  Color
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                as="select"
                placeholder="Color"
                aria-describedby="Color"
                defaultValue={state.color}
                onChange={(e) => onChangeText(e.target.value, "color")}
              >
                <option value={null}>Select Color</option>
                {colors.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </FormControl>
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Plate Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="plateNo"
                defaultValue={state.plateNo}
                placeholder="Plate Number"
                onChange={(e) => onChangeText(e.target.value, "plateNo")}
              />
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Make
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                as="select"
                placeholder="Color"
                aria-describedby="Color"
                defaultValue={state.make}
                onChange={(e) => onChangeText(e.target.value, "make")}
              >
                <option value={null}>Select Make</option>
                {vehicleTypes &&
                  [
                    "Acura",
                    "Alfa-Romeo",
                    "Aston Martin",
                    "Audi",
                    "BMW",
                    "Bentley",
                    "Buick",
                    "Cadilac",
                    "Chevrolet",
                    "Chrysler",
                    "Daewoo",
                    "Daihatsu",
                    "Dodge",
                    "Eagle",
                    "Ferrari",
                    "Fiat",
                    "Fisker",
                    "Ford",
                    "Freighliner",
                    "GMC - General Motors Company",
                    "Genesis",
                    "Geo",
                    "Honda",
                    "Hummer",
                    "Hyundai",
                    "Infinity",
                    "Isuzu",
                    "Jaguar",
                    "Jeep",
                    "Kla",
                    "Lamborghini",
                    "Land Rover",
                    "Lexus",
                    "Lincoln",
                    "Lotus",
                    "Mazda",
                    "Maserati",
                    "Maybach",
                    "McLaren",
                    "Mercedez-Benz",
                    "Mercedez-Benz",
                    "Mercury",
                    "Mini",
                    "Mitsubishi",
                    "Nissan",
                    "Oldsmobile",
                    "Panoz",
                    "Plymouth",
                    "Polestar",
                    "Pontiac",
                    "Porsche",
                    "Ram",
                    "Rivian",
                    "Rolls_Royce",
                    "Saab",
                    "Saturn",
                    "Smart",
                    "Subaru",
                    "Suzuki",
                    "Tesla",
                    "Toyota",
                    "Volkswagen",
                    "Volvo",
                  ].map((item) => <option value={item}>{item}</option>)}
              </FormControl>
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Model
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Model"
                defaultValue={state.model}
                placeholder="Model"
                onChange={(e) => onChangeText(e.target.value, "model")}
              />
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Year
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Year"
                defaultValue={state.year}
                placeholder="Year"
                onChange={(e) => onChangeText(e.target.value, "year")}
              />
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Vehicle Type
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                as="select"
                aria-describedby="type"
                defaultValue={state.type}
                onChange={(e) => onChangeText(e.target.value, "type")}
              >
                <option value={null}>Select Vehicle Type</option>
                {vehicleTypes &&
                  vehicleTypes.map((item) => (
                    <option value={item._id}>{item?.name}</option>
                  ))}
              </FormControl>
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
