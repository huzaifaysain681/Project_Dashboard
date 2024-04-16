import React, { useState } from "react";
import { Modal } from "react-bootstrap";
const ConfirmModal = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div
          style={{ ...styles.Vflex, textAlign: "center", padding: "20px 5px" }}
        >
          <h3>{` ${props.status}`} </h3>
          <div style={{ ...styles.Hflex, justifyContent: "center" }}>
            <button
              style={{ ...styles.button, padding: "5px 15px" }}
              onClick={props.onHide}
            >
              Yes
            </button>
            <button
              style={{
                ...styles.button,
                background: "#b6b3b3",
                color: "#fff",
                padding: "5px 15px",
              }}
              onClick={props.onHide}
            >
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;

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
  },
  Vflex: {
    display: "flex",
    flexDirection: "column",
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
