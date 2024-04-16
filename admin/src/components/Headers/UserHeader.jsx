import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "250px",
            backgroundImage:
              "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          <span className="mask bg-gradient-default opacity-8" />
        </div>
      </>
    );
  }
}

export default UserHeader;
