import React from "react";
import "./style.scss";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
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
      console.log(this.state);

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

  render() {
    return (
      <div>
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Register</div>
          <div className="content">
            <div className="form">
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="name">Username:</label>

                  <input
                    type="text"
                    name="name"
                    value={this.state.input.name}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter name"
                    id="name"
                  />

                  <div className="text-danger">{this.state.errors.name}</div>
                </div>

                <div class="form-group">
                  <label for="email">Email Address:</label>

                  <input
                    type="text"
                    name="email"
                    value={this.state.input.email}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter email"
                    id="email"
                  />

                  <div className="text-danger">{this.state.errors.email}</div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="footer">
                  <center><input type="submit" value="Register" className="btn" /></center>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
