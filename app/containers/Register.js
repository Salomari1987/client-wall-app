import React from 'react';
import {Link} from 'react-router';
import RegisterStore from '../stores/RegisterStore';
import RegisterActions from '../actions/RegisterActions';
import FieldGroup from '../components/FieldGroup';
import { Col, Form, Button, FormGroup } from 'react-bootstrap';
import AlertComponent from '../components/AlertComponent';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = RegisterStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
  }

  componentDidMount() {
    RegisterStore.listen(this.onChange);
  }

  componentWillUnmount() {
    RegisterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    RegisterActions.register(this.state, this.props.history);
  }

  getValidationState(toBeChecked) {
    if (toBeChecked.length > 5) {
      return 'success';
    } else {
      return 'error';
    } 
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }

  render() {
    var errorMessages = this.state.errors.map((error, i) => {
      return (
        <p key={i.toString()} > {error} </p>
      );
    });
    var alert = (function () {
      if (errorMessages.length > 0) {
        return (
          <AlertComponent 
          handleAlertDismiss={this.handleAlertDismiss.bind(this)}
          errorMessages={errorMessages}
          handleAlertShow={this.handleAlertShow.bind(this)}
          alertVisible={this.state.alertVisible} />
        );
      }
    }).call(this);

    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>

        <FieldGroup 
          validationState={this.getValidationState(this.state.username)}
          fieldID='username'
          fieldLabel='Username*'
          onChange={RegisterActions.updateUsername}
          helpBlock='Username is too short'
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='text'
          isHelpBlock={true}
          placeholder='username'
          isRequired={true}
        />
        <FieldGroup 
          validationState={this.getValidationState(this.state.password)}
          fieldID='password'
          fieldLabel='Password*'
          onChange={RegisterActions.updatePassword}
          helpBlock='Password is too short'
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='password'
          isHelpBlock={true}
          placeholder='password'
          isRequired={true}
        />
        <FieldGroup 
          validationState={this.getValidationState(this.state.email)}
          fieldID='email'
          fieldLabel='Email*'
          onChange={RegisterActions.updateEmail}
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='email'
          isHelpBlock={false}
          placeholder='email'
          isRequired={true}
        />
        <FieldGroup 
          fieldLabel='First Name'
          onChange={RegisterActions.updateFirstName}
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='text'
          isHelpBlock={false}
          placeholder='text'
          isRequired={false}
        />
        <FieldGroup 
          fieldLabel='Last Name'
          onChange={RegisterActions.updateLastName}
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='text'
          isHelpBlock={false}
          placeholder='text'
          isRequired={false}
        />
        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit">
              Register
            </Button>
            <span> already have an account? <Link to='/login'> Login </Link> </span>
          </Col>
        </FormGroup>
        {alert}
      </Form>
    );
  }
}

export default Register;
