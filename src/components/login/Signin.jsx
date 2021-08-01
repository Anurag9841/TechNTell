import React from "react";
import "./style.scss";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
      forgot: false,
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;

    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {

      let input = {};

      input["name"] = "";

      input["email"] = "";

      this.setState({ input: input });
    }

  }

  validate() {
    let input = this.state.input;

    let errors = {};

    let isValid = true;

    if (!input["name"]) {
      isValid = false;

      errors["name"] = "Please enter your name.";
    }

    if (!input["email"]) {
      isValid = false;

      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["email"] = "Please enter valid email address.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  login() {
    this.props.authUser({ username: this.state.input.email, password: this.state.input.password });
  }
  forgot() {
    this.setState({ forgot: true });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.forgot === false && (
            <div>
              <div className="base-container" ref={this.props.containerRef}>
                <div className="header">Login</div>
                <div className="content">
                  <div className="form">
                    <div class="form-group">
                      <label for="email">Username:</label>

                      <input
                        type="text"
                        name="email"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        class="form-control"
                        placeholder="Enter username"
                        id="email"
                      />

                      <div className="text-danger">
                        {this.state.errors.email}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <center>
                    <input type="submit" value="Login" className="btn"  onClick={this.login.bind(this)}  />
                  </center>
                  <br></br>
                  <center>
                    <a href="#" onClick={this.forgot.bind(this)}>
                      Forgot Password?
                    </a>
                  </center>
                </div>
              </div>
            </div>
          )}
          {this.state.forgot === true && <ForgotPassword />}
        </form>
      </div>
    );
  }
}
class ForgotPassword extends React.Component {
  reset() {
    alert("Password is sent to your email");
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">
                <h3>Enter your email to reset password.</h3>
              </label>
              <input type="text" name="username" placeholder="" />
            </div>
            <div className="footer">
              <button
                type="button"
                className="btn"
                onClick={this.reset.bind(this)}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
