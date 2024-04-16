import React from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { BASE } from "../../utils/config";
const ViewTyreModal = ({ tyre, ...props }) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        {tyre && (
          <>
            <Carousel
              indicators={false}
              nextIcon=""
              prevIcon=""
              interval={2000}
            >
              {tyre?.images.map((item) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={BASE + item.url}
                    alt="product image"
                    style={styles.image}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div style={styles.container}>
              <h3>{tyre.name}</h3>
              <p>{tyre?.description}</p>
              <div style={styles.infoblock}>
                {tyre.sizes?.map((item) => {
                  return (
                    <>
                      <h3>
                        Size:&nbsp;
                        {item.size}
                      </h3>
                      <p style={styles.textred}>
                        ${item.cutPrice}
                        <span style={styles.discount}>${item.price}</span>
                        <span style={styles.typebox}>{item.quantity}</span>
                      </p>
                    </>
                  );
                })}

                <h3>
                  Part Number:{" "}
                  <span style={styles.textnormal}>{tyre?.partNumber}</span>
                </h3>
                <h3>
                  UTQG: <span style={styles.textnormal}>{tyre?.udqg}</span>
                </h3>
                <h3>
                  Sidewall:{" "}
                  <span style={styles.textnormal}>{tyre?.sidewall}</span>
                </h3>
                <h3>
                  Load Range:{" "}
                  <span style={styles.textnormal}>{tyre?.loadRange}</span>
                </h3>
                <h3>
                  Trade life Warrenty:{" "}
                  <span style={styles.textnormal}>{tyre?.warranty}</span>
                </h3>
                <h3>
                  Category:{" "}
                  <span style={styles.textnormal}>{tyre?.category?.name}</span>
                </h3>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ViewTyreModal;

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
