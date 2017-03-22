import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';
import FieldGroup from '../components/FieldGroup';
import { Alert, Col, Form, Button, FormGroup } from 'react-bootstrap';
import AlertComponent from '../components/AlertComponent';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.handleAlertShow = this.handleAlertShow.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    LoginActions.login(this.state, this.props.history);
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
          fieldLabel='Username'
          onChange={LoginActions.updateUsername}
          helpBlock='Username is required'
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
          fieldLabel='Password'
          onChange={LoginActions.updatePassword}
          helpBlock='Password is required'
          isLabel={true}
          size={this.state.size}
          offset={this.state.offset} 
          type='password'
          isHelpBlock={true}
          placeholder='password'
          isRequired={true}
        />
        <FormGroup>
          <Col smOffset={4} sm={8}>
            <Button type="submit">
              Login
            </Button>
            <span> you do not have an account? <Link to='/register'> Register </Link> </span>
          </Col>
        </FormGroup>
        {alert}
      </Form>
    );
  }
}

export default Login;