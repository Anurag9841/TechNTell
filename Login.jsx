import React, { Component } from 'react'
import { Form, FormGroup, Input, Label, Button, Row, Col } from 'react-bootstrap';


class Login extends Component {
    
constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

  }

  handleLogin(event) {
    // console.log(this.username.value);
    // console.log(this.password.value);
    this.props.authUser({ username: this.username.value, password: this.password.value });
    event.preventDefault();
  }

  render() {
    
    return (
    
        <div>
              <h3 className="top_product">Login</h3>
      <div className="login ">
      
        <Form onSubmit={this.handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" ref={(input) => this.username = input} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(input) => this.password = input} />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
  </Button>
        </Form>
      </div>
      </div>
    );
  }
}

export default Login;