import React, { useEffect, useState } from "react";
import { Modal, InputGroup, FormControl } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Button } from "reactstrap";
import shortid from "shortid";
import {
  addTyreAsync,
  deleteTyreSize,
  deleteTyreImage,
  updateTyreAsync,
} from "../../utils/ApiManager";
import { BASE } from "../../utils/config";
const EditTyreModal = ({ tyre, categories, ...props }) => {
  const [alert, setAlert] = useState(null);
  const [state, setState] = useState({
    sizes: tyre?.sizes || [],
    name: tyre?.name || "",
    company: tyre?.company || "",
    description: tyre?.description || "",
    category: tyre?.category?._id || "",
    partNumber: tyre?.partNumber || "",
    udqg: tyre?.udqg || "",
    sidewall: tyre?.sidewall || "",
    loadRange: tyre?.loadRange || "",
    warranty: tyre?.warranty || "",
    images: tyre?.images || [],
    files: [],
  });
  useEffect(() => {
    setState({
      sizes: tyre?.sizes || [],
      name: tyre?.name || "",
      company: tyre?.company || "",
      description: tyre?.description || "",
      category: tyre?.category?._id || "",
      partNumber: tyre?.partNumber || "",
      udqg: tyre?.udqg || "",
      sidewall: tyre?.sidewall || "",
      loadRange: tyre?.loadRange || "",
      warranty: tyre?.warranty || "",
      images: tyre?.images || [],
      files: [],
    });
  }, [tyre]);
  const onChangeText = (value, key) => {
    setState((state) => ({
      ...state,
      [key]: value,
    }));
  };
  const addSize = () => {
    var id = shortid();
    setState((state) => ({
      ...state,
      sizes: [
        ...state.sizes,
        {
          size: null,
          price: null,
          cutPrice: null,
          quantity: null,
          id,
        },
      ],
    }));
  };
  const removeSize = (item) => {
    if (item.id) {
      setState((state) => ({
        ...state,
        sizes: state.sizes.filter((i) => i.id != item.id),
      }));
    } else {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Size !`}
          onConfirm={() => {
            deleteTyreSize({ size: item, _id: tyre._id }).then((res) => {
              if (res?.success) {
                setState((state) => ({
                  ...state,
                  sizes: state.sizes.filter((i) => i._id != item._id),
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
  const removeImage = (item) => {
    if (item.id) {
      setState((state) => ({
        ...state,
        images: state.images.filter((i) => i.id != item.id),
        files: state.files.filter((i) => i.id != item.id),
      }));
    } else {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "100px" }}
          title={`Are you Sure You Want To Image !`}
          onConfirm={() => {
            deleteTyreImage({ image: item, _id: tyre._id }).then((res) => {
              if (res?.success) {
                setState((state) => ({
                  ...state,
                  images: state.images.filter((i) => i._id != item._id),
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
            images: [...state.images, { url: picFile.result, id }],
            files: [...state.files, { file: file, id }],
          }));
        });
        picReader.readAsDataURL(file);
      }
    } else {
      alert("Your browser does not support File API");
    }
  };
  const onSizesValueChange = (id, key, value) => {
    var index = state.sizes.findIndex(
      (item) => item.id == id || item._id == id
    );
    var sizes = [...state.sizes];
    sizes[index][key] = value;
    setState((state) => ({
      ...state,
      sizes,
    }));
  };
  const addTyre = () => {
    var form = new FormData();
    for (let i in state)
      if (i !== "files" && i !== "sizes" && i !== "images")
        form.append(i, state[i]);

    for (let i = 0; i < state.sizes.length; i++) {
      const element = state.sizes[i];
      for (let j in element)
        form.append("sizes[" + i + "][" + j + "]", element[j]);
    }
    for (let i = 0; i < state.files.length; i++) {
      form.append("images", state.files[i]?.file);
    }
    addTyreAsync(form).then((res) => {
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
  const updateTyre = () => {
    var form = new FormData();
    form.append("_id", tyre?._id);
    for (let i in state)
      if (i !== "files" && i !== "sizes" && i !== "images")
        if (state[i]) form.append(i, state[i]);

    for (let i = 0; i < state.sizes.length; i++) {
      const element = state.sizes[i];
      for (let j in element)
        form.append("sizes[" + i + "][" + j + "]", element[j]);
    }
    for (let i = 0; i < state.files.length; i++) {
      form.append("images", state.files[i]?.file);
    }
    updateTyreAsync(form).then((res) => {
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
              {state.images.map((item) => (
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => removeImage(item)}
                    style={styles.removeIc}
                  >
                    <p style={{ marginTop: "-4px", fontSize: "12px" }}>x</p>
                  </div>
                  <img
                    src={item._id ? BASE + item.url : item.url}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              ))}
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
                  Category
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                as="select"
                aria-describedby="Category"
                defaultValue={state.category}
                onChange={(e) => onChangeText(e.target.value, "category")}
              >
                <option value={null}>Select Category</option>
                {categories?.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </FormControl>
            </InputGroup>
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Company
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Company"
                defaultValue={state.company}
                onChange={(e) => onChangeText(e.target.value, "company")}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Description
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                style={{ minHeight: "150px", maxHeight: "250px" }}
                className="pl-2"
                as="textarea"
                aria-label="Description"
                defaultValue={state.description}
                onChange={(e) => onChangeText(e.target.value, "description")}
              />
            </InputGroup>
            <div
              style={{
                border: state.sizes.length > 0 ? "1px solid #139152" : 0,
              }}
            >
              <div style={styles.Hflex}>
                <InputGroup className="m-1">
                  <InputGroup.Prepend>
                    <InputGroup.Text
                      style={{ background: "#139152", color: "#fff" }}
                    >
                      Sizes
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                </InputGroup>
                <Button onClick={addSize} color="primary">
                  add
                </Button>
              </div>
              {state.sizes?.map((item, index) => {
                return (
                  <>
                    {index > 0 && (
                      <div
                        style={{ width: "100%", border: "0.3px solid #139152" }}
                      />
                    )}
                    <div
                      onClick={() => removeSize(item)}
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
                            Orignal Price
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          className="pl-2"
                          aria-describedby="Orignal Price"
                          defaultValue={item.price}
                          type="number"
                          onChange={(e) =>
                            onSizesValueChange(
                              item.id || item._id,
                              "price",
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
                            Discounted Price
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          className="pl-2"
                          aria-describedby="Discounted Price"
                          defaultValue={item.cutPrice}
                          type="number"
                          onChange={(e) =>
                            onSizesValueChange(
                              item.id || item._id,
                              "cutPrice",
                              e.target.value
                            )
                          }
                        />
                      </InputGroup>
                    </div>
                    <div style={styles.Hflex}>
                      <InputGroup className="m-1">
                        <InputGroup.Prepend>
                          <InputGroup.Text
                            style={{ background: "#139152", color: "#fff" }}
                          >
                            Size
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          className="pl-2"
                          aria-describedby="Size"
                          type="number"
                          defaultValue={item.size}
                          onChange={(e) =>
                            onSizesValueChange(
                              item.id || item._id,
                              "size",
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
                            Quantity
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          className="pl-2"
                          aria-describedby="Quantity"
                          type="number"
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            onSizesValueChange(
                              item.id || item._id,
                              "quantity",
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
            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Part Number
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="Part num"
                defaultValue={state.partNumber}
                onChange={(e) => onChangeText(e.target.value, "partNumber")}
                //   value={props?.tyre?.partNo}
              />
            </InputGroup>

            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  UTQG
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="utqg"
                defaultValue={state.udqg}
                onChange={(e) => onChangeText(e.target.value, "udqg")}
                //   value={props?.tyre?.utqg}
              />
            </InputGroup>

            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Sidewall
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="sidewall"
                defaultValue={state.sidewall}
                onChange={(e) => onChangeText(e.target.value, "sidewall")}
                //   value={props?.tyre?.sidewall}
              />
            </InputGroup>

            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Load Range
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="loadRange"
                defaultValue={state.loadRange}
                onChange={(e) => onChangeText(e.target.value, "loadRange")}
                //   value={props?.tyre?.loadRange}
              />
            </InputGroup>

            <InputGroup className="m-1">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{ background: "#139152", color: "#fff" }}
                >
                  Trade life Warrenty
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                className="pl-2"
                aria-describedby="tradeLifeWarrenty"
                defaultValue={state.warranty}
                onChange={(e) => onChangeText(e.target.value, "warranty")}
                //   value={props?.tyre?.tradeLifeWarrenty}
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
                onClick={(e) => {
                  e.preventDefault();
                  if (tyre?._id) {
                    updateTyre();
                  } else {
                    addTyre();
                  }
                }}
                style={{ ...styles.button, width: "50%" }}
              >
                {tyre?._id ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </>
      </Modal.Body>
      {alert}
    </Modal>
  );
};

export default EditTyreModal;

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
