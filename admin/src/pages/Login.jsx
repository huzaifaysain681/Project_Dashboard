import { localsName } from "ejs";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Spinner,
  Col,
} from "reactstrap";
import { loginFunction } from "../utils/ApiManager";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
    };
  }
  login = (e) => {
    e.preventDefault();
    loginFunction(this.state).then((res) => {
      console.log(res);
      if (res?.success) {
        localStorage.setItem("user", JSON.stringify(res?.user));
        window.location.href = "/admin/vehicle-types";
      } else {
        alert(res?.message || "Network error!");
      }
    });
  };
  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div
            style={{
              width: "100%",
              height: "400px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: "1",
              textAlign: "center",
            }}
          >
            <Spinner style={{ width: "3rem", height: "3rem", color: "#fff" }} />
          </div>
        ) : (
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2">
                  <h1>Login</h1>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form" onSubmit={this.login}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-circle-08" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(evt) => {
                          this.setState({ username: evt.target.value });
                        }}
                        placeholder="Username"
                        // type="email"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(evt) => {
                          this.setState({ password: evt.target.value });
                        }}
                        placeholder="Password"
                        type="password"
                      />
                    </InputGroup>
                  </FormGroup>
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Keep me Login</span>
                    </label>
                  </div> */}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      style={{ backgroundColor: "#139152", color: "#fff" }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        )}
      </>
    );
  }
}

export default Login;
