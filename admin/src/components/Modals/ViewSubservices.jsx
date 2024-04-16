import React from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BASE } from "../../utils/config";
const ViewSubservices = ({ service, ...props }) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {service && (
          <>
            <Carousel
              indicators={false}
              nextIcon=""
              prevIcon=""
              interval={2000}
            >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={[BASE + service?.image]}
                  alt="product image"
                  style={styles.image}
                />
              </Carousel.Item>
            </Carousel>
            <div style={styles.container}>
              <h3>Name: {service.name}</h3>
              <p>{service?.description}</p>
              <h3>Sub Services</h3>
              <div style={styles.infoblock}>
                {service.subServices?.map((item) => {
                  return (
                    <>
                      <h5>
                        Name:&nbsp;
                        {item.name}
                      </h5>
                      <p style={styles.textred}>${item.price}</p>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewSubservices;

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
};
