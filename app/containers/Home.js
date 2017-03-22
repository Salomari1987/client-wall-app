import React from 'react';
import { Alert, Col, Form, Button, FormGroup, Row } from 'react-bootstrap';
import {Link} from 'react-router';
import Wall from './Wall';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Col smOffset={3} sm={6}>
          <h1>Welcome to the Ultimate Wall App</h1>
        </Col>
        <Row />
        <div className='home-component'>
          <Col smOffset={3} sm={6}>
            <Link to='/login'> <Button className='btn btn-primary btn-home'>  Login </Button></Link> 
             <span> or </span>
            <Link to='/wall'> <Button className='btn btn-home'> Continue As guest </Button></Link> 
          </Col>
          <Row /> 
        </div>
        <Wall chatHeight='panel-body-home' input={true} wallContainer='home-wall'/>
      </div>
    );
  }
}

export default Home;
