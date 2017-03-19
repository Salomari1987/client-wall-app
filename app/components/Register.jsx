import React from 'react';
import {Link} from 'react-router';
import RegisterStore from '../stores/RegisterStore.jsx';
import RegisterActions from '../actions/RegisterActions.jsx';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

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
	    if (toBeChecked.length > 5) return 'success';
	    else return 'error';
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
				if (this.state.alertVisible) {
					return (
						<Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
				          <h4>Oh snap! There was an error!</h4>
				          {errorMessages}
				          <p>
				            <Button bsStyle="danger">Take this action</Button>
				            <span> or </span>
				            <Button onClick={this.handleAlertDismiss}>Hide Alert</Button>
				          </p>
				        </Alert>
					)
				} else {
					return (
				      <Button onClick={this.handleAlertShow}>Show Alert</Button>
				    );
				}
			}
		}).call(this)
		return (
			<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
				<FormGroup validationState={this.getValidationState(this.state.username)}>
					<Col sm={2} smOffset={2} componentClass={ControlLabel} >Username* </Col>
					<Col sm={6}>
						<FormControl type='text' placeholder='username' onChange={RegisterActions.updateUsername} required/>
					</Col>
					<FormControl.Feedback />
     				<HelpBlock>Username is too short</HelpBlock>
				</FormGroup>
				<FormGroup validationState={this.getValidationState(this.state.password)}>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> Password* </Col>
					<Col sm={6}>
						<FormControl type='password' placeholder='password' onChange={RegisterActions.updatePassword} required/>
					</Col>
					<FormControl.Feedback />
     				<HelpBlock>Password is too short</HelpBlock>
				</FormGroup>
				<FormGroup>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> Email* </Col>
					<Col sm={6}>
						<FormControl type='email' placeholder='email' onChange={RegisterActions.updateEmail} required/>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> First Name </Col>
					<Col sm={6}>
						<FormControl type='text' placeholder='first name' onChange={RegisterActions.updateFirstName} />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> Last Name </Col>
					<Col sm={6}>
						<FormControl type='text' placeholder='last name' onChange={RegisterActions.updateLastName} />
					</Col>
				</FormGroup>
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
		)
	}
}

export default Register;