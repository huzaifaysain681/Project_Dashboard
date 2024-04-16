import React from "react";
import { Modal } from "react-bootstrap";
import TableViewOrder from "../Tables/TableViewOrderDetails";
const ServiceDetails = (props) => {
  const { service } = props;
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div style={styles.Vflex}>
          <div style={styles.Hflex}>
            <h3>Date:&nbsp;</h3>
            <p>{service.date}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Service Type:&nbsp;</h3>
            <p>{service.service.type}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Service Name:&nbsp;</h3>
            <p>{service.service.name}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Service Type:&nbsp;</h3>
            <p>{service.service.type}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Requested Location:&nbsp;</h3>
            <p>{service.service.requestedLocation.formattedAddress}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Requested By:&nbsp;</h3>
            <p>{`${service.customer.name}`}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Requester Email:&nbsp;</h3>
            <p>{`${service.customer.email}`}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Requester Phone:&nbsp;</h3>
            <p>{`${service.customer.phone}`}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Assigned To:&nbsp;</h3>
            <p>{service.technician.name}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Requested at:&nbsp;</h3>
            <p>{service.service.requestTime}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Accepted at:&nbsp;</h3>
            <p>{service.service.acceptTime}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Total Service Time:&nbsp;</h3>
            <p>{service.service.totalTime}</p>
          </div>
          <div style={styles.Hflex}>
            <h3>Bill:&nbsp;</h3>
            <p>{`$${service.service.bill}`}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ServiceDetails;
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
