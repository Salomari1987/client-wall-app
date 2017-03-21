import React from 'react';
import {Link} from 'react-router';
import LoginStore from '../stores/LoginStore.jsx';
import LoginActions from '../actions/LoginActions.jsx';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

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
				            <Button id='alert-dismiss' onClick={this.handleAlertDismiss}>Hide Alert</Button>
				          </p>
				        </Alert>
					)
				} else {
					return (
				      <Button id='alert-show' onClick={this.handleAlertShow}>Show Alert</Button>
				    );
				}
			}
		}).call(this)
		return (
			<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
				<FormGroup
					validationState={this.getValidationState(this.state.username)}
				>
					<Col sm={2} smOffset={2} componentClass={ControlLabel} >Username </Col>
					<Col sm={6}>
						<FormControl id='username' type='text' placeholder='username' onChange={LoginActions.updateUsername} required/>
						<FormControl.Feedback />
         				<HelpBlock>Username is required</HelpBlock>
					</Col>
				</FormGroup>
				<FormGroup
					validationState={this.getValidationState(this.state.password)}
					>
					<Col sm={2} smOffset={2} componentClass={ControlLabel}> Password </Col>
					<Col sm={6}>
						<FormControl id='password' type='password' placeholder='password' onChange={LoginActions.updatePassword} required/>
						<FormControl.Feedback />
         				<HelpBlock>Password is required</HelpBlock>
					</Col>
				</FormGroup>
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
		)
	}
}

export default Login;