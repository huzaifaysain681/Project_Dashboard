import React from "react";
import { Button } from "reactstrap";
import { BASE } from "../../utils/config";

class TableTyres extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { tyre } = this.props;
    return (
      <>
        <tr key={tyre.id}>
          <th scope="col">
            <img
              src={tyre.images && tyre.images[0] && BASE + tyre.images[0].url}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
              }}
            />
          </th>
          <th scope="col">{tyre.name}</th>

          <th scope="col">{tyre.company}</th>
          <th scope="col">{tyre.partNumber}</th>
          <th scope="col">{tyre.udqg}</th>
          <th scope="col">{tyre.sidewall}</th>
          <th scope="col">{tyre.loadRange}</th>
          <th scope="col">{tyre.warranty}</th>
          <th scope="col">
            <Button onClick={() => this.props.view(tyre)} color="info">
              View
            </Button>
          </th>

          {localStorage.getItem("userType") === "accountant" ? null : (
            <>
              <th scope="col">
                <Button color="primary" onClick={() => this.props.edit(tyre)}>
                  Edit
                </Button>
              </th>
              <th scope="col">
                <Button
                  style={{ backgroundColor: "#139152", color: "#fff" }}
                  onClick={() => this.props.delete(tyre)}
                >
                  Delete
                </Button>
              </th>
            </>
          )}
        </tr>
      </>
    );
  }
}
export default TableTyres;
