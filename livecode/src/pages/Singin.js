import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from "../Store/store";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    // this.props.setLogin = this.props.setLogin.bind(this);
  }

  state = { Email: "", password: "" };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  postLogin = () => {
    const { username, password } = this.state;
    const mydata = {
      username: username,
      password: password
    };

    axios
      .post("https://livecode.free.beeceptor.com/sign", mydata)
      .then(response => {
        console.log(response.data);
        console.log(this.props.is_login);
        if (response.data.hasOwnProperty("status")) {
          this.props.setLogin(response.data.status);
          this.props.setEmail(this.state.Email);
          this.props.setName(this.state.password);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log("ini Error", error);
      });
  };

  render() {
    console.log("ini props", this.props);
    console.log("is_login");
    console.log("state", this.state);
    return (
      <div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-4">
              <form onSubmit={e => e.preventDefault()}>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    required
                    type="email"
                    class="form-control"
                    name="Email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={e => this.changeInput(e)}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={e => this.changeInput(e)}
                  />
                </div>
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={() => this.postLogin()}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  "email, name, is_login",
  actions
)(withRouter(SignIn));
