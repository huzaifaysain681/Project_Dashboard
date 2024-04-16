import React from "react";

import { Button } from "reactstrap";

class TableServiceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { serviceHist } = this.props;
    var subServices = "";
    if (serviceHist.type == "mechanic") {
      serviceHist.service?.subServices?.map((item) => {
        if (serviceHist.subServices?.includes(item._id)) {
          if (!subServices) {
            subServices = subServices + item.name;
          } else subServices = subServices + ", " + subServices + item.name;
        }
      });
    }
    return (
      <>
        <tr key={serviceHist.id}>
          <th scope="col">{serviceHist.type}</th>
          <th scope="col">
            {serviceHist.type == "gas"
              ? serviceHist.service?.name + ` (${serviceHist.gallons}) gallons`
              : subServices}
          </th>
          <th scope="col">{serviceHist.status}</th>
          <th scope="col">{`$${serviceHist.price}`}</th>
          <th scope="col">
            {serviceHist.user
              ? serviceHist.user.firstName + " " + serviceHist.user.lastName
              : null}
          </th>
          <th scope="col">
            {serviceHist.assignedDriver
              ? serviceHist.assignedDriver.name
              : null}
          </th>
          <th scope="col">
            {serviceHist.customerReview
              ? serviceHist.customerReview.stars
                ? serviceHist.customerReview.stars + "⭐"
                : "No Rating"
              : "No Rating"}
          </th>
          <th scope="col">
            {serviceHist.providerReview
              ? serviceHist.providerReview.stars
                ? serviceHist.providerReview.stars + "⭐"
                : "No Rating"
              : "No Rating"}
          </th>
        </tr>
      </>
    );
  }
}
export default TableServiceHistory;
