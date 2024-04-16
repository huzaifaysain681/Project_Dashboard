import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";
import shortid from "shortid";
import {
  deleteSubServiceApi,
  addServicesApi,
  updateServiceApi,
} from "../../utils/ApiManager";
import { BASE } from "../../utils/config";
const EditServiceModal = ({ service, ...props }) => {
  const [alert, setAlert] = useState(null);
  const [state, setState] = useState({
    name: service?.name || "",
    price: service?.price || "",
    type: service?.type || "",
    image: service?.image || "",
    subServices: service?.subServices || [],
    file: null,
    imageDeleted: false,
  });
  useEffect(() => {
    setState({
      name: service?.name || "",
      price: service?.price || "",
      type: service?.type || "",
      image: service?.image || "",
      subServices: service?.subServices || [],
      file: null,
      imageDeleted: false,
    });
  }, [service]);
  const onChangeText = (value, key) => {
    setState((state) => ({
      ...state,
      [key]: value,
    }));
  };
  const addSubServices = () => {
    var id = shortid();
    setState((state) => ({
      ...state,
      subServices: [
        ...state.subServices,
        {
          name: "",
          price: null,
          id,
        },
      ],
    }));
  };
  const removeSebService = (item) => {
    if (item.id) {
      setState((state) => ({
        ...state,
        subServices: state.subServices.filter((i) => i.id != item.id),
      }));
    } else {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Size !`}
          onConfirm={() => {
            deleteSubServiceApi({
              subServiceId: item._id,
              _id: service._id,
            }).then((res) => {
              if (res?.success) {
                setState((state) => ({
                  ...state,
                  subServices: state.subServices.filter(
                    (i) => i._id != item._id
                  ),
                }));
              }
              setAlert(null);
            });
          }}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="danger"
          showCancel
          confirmBtnText="Yes"
        ></SweetAlert>
      );
    }
  };
  const removeImage = () => {
    if (!service?._id) {
      setState((state) => ({ ...state, image: "", file: null }));
    } else {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Image !`}
          onConfirm={() => {
            setState((state) => ({
              ...state,
              image: "",
              file: null,
              imageDeleted: true,
            }));
          }}
          onCancel={() => setAlert(null)}
          confirmBtnBsStyle="danger"
          showCancel
          confirmBtnText="Yes"
        ></SweetAlert>
      );
    }
  };
  /////////
  const onFileSelected = (event) => {
    if (window.File && window.FileList && window.FileReader) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //Only pics
        if (!file.type.match("image")) continue;
        var picReader = new FileReader();
        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          var id = shortid();
          setState((state) => ({
            ...state,
            image: picFile.result,
            file: file,
          }));
        });
        picReader.readAsDataURL(file);
      }
    } else {
      alert("Your browser does not support File API");
    }
  };
  const onSubServiceValueChange = (id, key, value) => {
    var index = state.subServices.findIndex(
      (item) => item.id == id || item._id == id
    );
    var sizes = [...state.subServices];
    sizes[index][key] = value;
    setState((state) => ({
      ...state,
      subServices: sizes,
    }));
  };
  const addService = () => {
    var form = new FormData();
    for (let i in state)
      if (i !== "file" && i !== "subServices" && i !== "image")
        form.append(i, state[i]);
    for (let i = 0; i < state.subServices.length; i++) {
      const element = state.subServices[i];
      for (let j in element)
        form.append("subServices[" + i + "][" + j + "]", element[j]);
    }
    form.append("image", state.file);
    addServicesApi(form).then((res) => {
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
    var form = new FormData();
    form.append("_id", service?._id);
    for (let i in state)
      if (i !== "file" && i !== "subServices" && i !== "image")
        form.append(i, state[i]);
    for (let i = 0; i < state.subServices.length; i++) {
      const element = state.subServices[i];
      for (let j in element)
        form.append("subServices[" + i + "][" + j + "]", element[j]);
    }
    if (state.file) form.append("image", state.file);
    updateServiceApi(form).then((res) => {
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
            {/* images */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridGap: "5px",
                margin: "5px 0px",
              }}
            >
              {state.image ? (
                <div style={{ position: "relative" }}>
                  {!service?._id ? (
                    <div onClick={() => removeImage()} style={styles.removeIc}>
                      <p style={{ marginTop: "-4px", fontSize: "12px" }}>x</p>
                    </div>
                  ) : null}
                  <img
                    src={service?._id ? BASE + state.image : state.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ) : null}
            </div>
            <input
              type="file"
              multiple={true}
              accept="image/*"
              onChange={onFileSelected}
            />
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Title
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Title"
                defaultValue={state.name}
                onChange={(e) => onChangeText(e.target.value, "name")}
              />
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Type
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                disabled={service?._id ? true : false}
                aria-describedby="type"
                defaultValue={state.type}
                as="select"
                onChange={(e) => onChangeText(e.target.value, "type")}
              >
                <option value="">Please Select Service Type</option>
                <option value="gas">Gas</option>
                <option value="mechanic">Mechanic</option>
              </FormControl>
              {state.type == "gas" && (
                <InputGroup className="m-1">
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{ background: "#139152", color: "#fff" }}
                    >
                      Price
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    className="pl-2"
                    aria-describedby="Price"
                    defaultValue={state.price}
                    type="number"
                    onChange={(e) => onChangeText(e.target.value, "price")}
                  />
                </InputGroup>
              )}
            </InputGroup>
            {state.type == "mechanic" ? (
              <div
                style={{
                  border:
                    state.subServices.length > 0 ? "1px solid #139152" : 0,
                }}
              >
                <div style={styles.Hflex}>
                  <InputGroup className="m-1">
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        style={{ background: "#139152", color: "#fff" }}
                      >
                        Sub Services
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                  <Button onClick={addSubServices} color="primary">
                    add
                  </Button>
                </div>
                {state.subServices?.map((item, index) => {
                  return (
                    <>
                      {index > 0 && (
                        <div
                          style={{
                            width: "100%",
                            border: "0.3px solid #139152",
                          }}
                        />
                      )}
                      <div
                        onClick={() => removeSebService(item)}
                        style={{ ...styles.removeIc, position: "relative" }}
                      >
                        <p style={{ marginTop: "-4px", fontSize: "12px" }}>x</p>
                      </div>
                      <div style={styles.Hflex}>
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
                            defaultValue={item.name}
                            type="text"
                            onChange={(e) =>
                              onSubServiceValueChange(
                                item.id || item._id,
                                "name",
                                e.target.value
                              )
                            }
                          />
                        </InputGroup>
                        <InputGroup className="m-1">
                          <InputGroup.Prepend>
                            <InputGroup.Text
                              style={{ background: "#139152", color: "#fff" }}
                            >
                              Price
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl
                            className="pl-2"
                            aria-describedby="Price"
                            defaultValue={item.price}
                            type="number"
                            onChange={(e) =>
                              onSubServiceValueChange(
                                item.id || item._id,
                                "price",
                                e.target.value
                              )
                            }
                          />
                        </InputGroup>
                      </div>
                    </>
                  );
                })}
              </div>
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
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
                {service?._id ? "Save" : "Add"}
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
