import { mount, shallow } from 'enzyme';
import React from 'react';
import chai from 'chai'
import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import Login from '../app/components/Login.jsx'
import LoginStore from '../app/stores/LoginStore.jsx';
import LoginActions from '../app/actions/LoginActions.jsx';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';

jest.mock('../app/stores/LoginStore.jsx');
jest.mock('../app/actions/LoginActions.jsx');

chai.use(sinonChai);

describe('<Login />', () => {
	beforeEach(function() {
		LoginStore.getState.mockReturnValue({
		  'username': '',
		  'password': '',
		  'errors': [],
		  'alertVisible': true
		});
	});

  it('does not contain a <button> element', function () {

		const login = mount(<Login />);
		const button = login.find('button')
    expect(button).to.have.length(1)
  });

  it('does not contain 2 <input> elements', function () {

		const login = mount(<Login />);
		const input = login.find('input')
    expect(input).to.have.length(2)
  });

  describe('Alert', () => {
  	var login;
  	var alert;
  	beforeEach(function() {
  		login = mount(<Login />);
  		login.setState({'errors': ['this is a test error']})
  		alert = login.find(Alert)

		})
  	it('if errors exist, it does not contain error messages', () => {

	    expect(alert).to.have.length(1)
	    expect(alert.text()).to.contain('this is a test error')
	    expect(alert.find(Button)).to.have.length(1)
	  });
	  it('if errors dismiss button is pressed, the message is hidden', () => {
	  	const button = alert.find('#alert-dismiss')
	  	expect(login.state().alertVisible).to.equal(true)
	  	button.simulate('click')
	  	expect(login.state().alertVisible).to.equal(false)
	  	expect(login.find(Alert)).to.have.length(0)
	  });
	 	it('if errors show button is pressed, the message is shown', () => {
	  	const buttonHide = alert.find('#alert-dismiss')
	  	buttonHide.simulate('click')
	  	const buttonShow = login.find('#alert-show')
	  	expect(buttonShow).to.have.length(1)
	  	expect(buttonShow.text()).to.equal('Show Alert')
	  	expect(login.state().alertVisible).to.equal(false)
	  	buttonShow.simulate('click')
	  	expect(login.state().alertVisible).to.equal(true)
	  	expect(login.find(Alert)).to.have.length(1)
	  	expect(login.find(Alert).text()).to.contain('this is a test error')
	  });
  });
  
  describe('Fill form', () => {

		it('should call LoginActions.updateUsername on change of username', () => {
			LoginActions.updateUsername = sinon.spy();
			const login = mount(<Login history='history'/>);
			const usernameInput = login.find('input #username')
			usernameInput.simulate('change')
			expect(LoginActions.updateUsername).to.have.been.called
		});

		it('should call LoginActions.updatePassword on change of password', () => {
			LoginActions.updatePassword = sinon.spy();
			const login = mount(<Login history='history'/>);
			const passwordInput = login.find('input #password')
			passwordInput.simulate('change')
			expect(LoginActions.updatePassword).to.have.been.called
		});

		it('should call LoginAction.login with state and history', () => {
			LoginActions.login = sinon.spy();
			const login = mount(<Login history='history'/>);
			const submit = login.find('form')
			submit.simulate('submit')
			expect(LoginActions.login).to.have.been.called
			expect(LoginActions.login).to.have.been.calledWith(login.state(), 'history')
		});
  });
})