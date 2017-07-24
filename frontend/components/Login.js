import React from 'react';
import {
  Navbar,
  NavItem,
  Row,
  Col,
  Input,
CardPanel, Button,
Card } from 'react-materialize';




class Login extends React.Component {
  constructor() {
    super();
    this.username = "";
    this.password = "";
  }

  updateUsername(text) {
    this.username = text;
  }

  updatePassword(text) {
    this.password = text;
  }
  handleLogin(event) {
    alert(`Login Attempt by: ${this.username} : ${this.password} `);
  }

  render() {
    return (
      <div>
        <Navbar brand='Horizons GoogleDocs Lite' right>
          <NavItem href='#'>Register</NavItem>
        </Navbar>
        <Row>
          <Col s={6} offset={"s3"} >
            <Card
              className='white darken-1'
              title='Login'
              actions={[<Button key={"loginButton"} waves='light' onClick={(e) => this.handleLogin(e)}>Login</Button>]}>
                <span></span>
                <Row>
                  <Input s={6} label="Username" validate onChange={(e) => this.updateUsername(e.target.value)}/>
                  <Input s={6} label="Password" type='password' validate onChange={(e) => this.updatePassword(e.target.value)} />
                </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Login;
