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
    this.registerUser = this.registerUser.bind(this);
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
registerUser(){
  let  input = this.state.input;
  console.log("input", input);
  this.props.signup(input.first_name,input.last_name,input.name,input.email,input.password)
  alert("register clicked");
}
  render() {
    return (
      <div>
        <div className="base-container" ref={this.props.containerRef}>
          <div className="header">Register</div>
          <div className="content">
            <div className="form">
              <form onSubmit={this.handleSubmit}>

              {/* fname */}
              <div class="form-group">
                  <label for="first_name">First Name:</label>

                  <input
                    type="text"
                    name="first_name"
                    value={this.state.input.first_name}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter First Name"
                    id="first_name"
                  />
                </div>
                {/* Last name */}
                <div class="form-group">
                  <label for="last_name">Last Name:</label>

                  <input
                    type="text"
                    name="last_name"
                    value={this.state.input.last_name}
                    onChange={this.handleChange}
                    class="form-control"
                    placeholder="Enter Last Name"
                    id="last_name"
                  />

                </div>

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
                    onChange={this.handleChange}
                  />
                </div>
                <div className="footer">
                  <center><input type="submit" value="Register" className="btn" onClick={this.registerUser.bind(this)}/></center>
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
