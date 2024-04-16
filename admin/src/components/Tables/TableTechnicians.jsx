import React from "react";

import { Button } from "reactstrap";
import { verifyUnverifyCustomer } from "../../utils/ApiManager";
import { BASE } from "../../utils/config";

class TableTechnicians extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (props.user) this.setState({ user: props.user });
  }
  block = (_id, status) => {
    verifyUnverifyCustomer({ _id, status }).then((res) => {
      if (res.success) {
        this.setState((s) => ({ user: { ...s.user, admin: status } }));
      }
    });
  };
  render() {
    const { user } = this.state;
    return (
      <>
        <tr key={user.id}>
          <th scope="col">
            <img
              src={BASE + user.image}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
              }}
            />
          </th>
          <th scope="col">{user.name}</th>
          <th scope="col">{user.type}</th>
          <th scope="col">{user.email}</th>
          <th scope="col">{user.phoneNumber}</th>
          <th scope="col">
            {user.averageRating
              ? user.averageRating.toFixed(2) + "⭐"
              : "No Ratings"}
          </th>
          <th scope="col">{user.jobs ? user.jobs : "No Jobs"}</th>
          <th scope="col">{user.online ? "Online" : "Offline"}</th>
          <th scope="col">
            {user.driveStatus == "free" ? "Free" : "In a job"}
          </th>

          <th scope="col">
            <Button
              onClick={() =>
                this.block(
                  user._id,
                  user.admin === "verified" ? "nonverified" : "verified"
                )
              }
              color={user.admin === "verified" ? "danger" : "info"}
            >
              {user.admin === "verified" ? "Un Verify" : "Verify"}
            </Button>
          </th>
        </tr>
      </>
    );
  }
}
export default TableTechnicians;
