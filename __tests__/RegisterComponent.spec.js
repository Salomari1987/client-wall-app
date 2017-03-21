import { mount, shallow } from 'enzyme';
import React from 'react';
import chai from 'chai'
import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import Register from '../app/components/Register.jsx'
import RegisterStore from '../app/stores/RegisterStore.jsx';
import RegisterActions from '../app/actions/RegisterActions.jsx';
import { Alert, Col, Form, Button, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import {Link} from 'react-router';

jest.mock('../app/stores/RegisterStore.jsx');
jest.mock('../app/actions/RegisterActions.jsx');

chai.use(sinonChai);

describe('<Register />', () => {
	beforeEach(function() {
		RegisterStore.getState.mockReturnValue({
		  'username': '',
		  'password': '',
		  'email': '',
		  'firstName': '',
		  'lastName': '',
		  'errors': [],
		  'alertVisible': true
		});
	});

  it('contains a <button> element', function () {

		const register = mount(<Register />);
		const button = register.find('button')
    expect(button).to.have.length(1)
  });

  it('contains 2 <input> elements', function () {

		const register = mount(<Register />);
		const inputs = register.find('input')
    expect(inputs).to.have.length(5)
  });

  describe('Alert', () => {
  	var register;
  	var alert;
  	beforeEach(function() {
  		register = mount(<Register />);
  		register.setState({'errors': ['this is a test error']})
  		alert = register.find(Alert)

		})
  	it('if errors exist, it does contain error messages', () => {

	    expect(alert).to.have.length(1)
	    expect(alert.text()).to.contain('this is a test error')
	    expect(alert.find(Button)).to.have.length(1)
	  });
	  it('if errors dismiss button is pressed, the message is hidden', () => {
	  	const button = alert.find('#alert-dismiss')
	  	expect(register.state().alertVisible).to.equal(true)
	  	button.simulate('click')
	  	expect(register.state().alertVisible).to.equal(false)
	  	expect(register.find(Alert)).to.have.length(0)
	  });
	 	it('if errors show button is pressed, the message is shown', () => {
	  	const buttonHide = alert.find('#alert-dismiss')
	  	buttonHide.simulate('click')
	  	const buttonShow = register.find('#alert-show')
	  	expect(buttonShow).to.have.length(1)
	  	expect(buttonShow.text()).to.equal('Show Alert')
	  	expect(register.state().alertVisible).to.equal(false)
	  	buttonShow.simulate('click')
	  	expect(register.state().alertVisible).to.equal(true)
	  	expect(register.find(Alert)).to.have.length(1)
	  	expect(register.find(Alert).text()).to.contain('this is a test error')
	  });
  });
  
  describe('Fill form', () => {

		it('should call RegisterActions.updateUsername on change of username', () => {
			RegisterActions.updateUsername = sinon.spy();
			const register = mount(<Register history='history'/>);
			const usernameInput = register.find('input #username')
			usernameInput.simulate('change')
			expect(RegisterActions.updateUsername).to.have.been.called
		});

		it('should call RegisterActions.updatePassword on change of password', () => {
			RegisterActions.updatePassword = sinon.spy();
			const register = mount(<Register history='history'/>);
			const passwordInput = register.find('input #password')
			passwordInput.simulate('change')
			expect(RegisterActions.updatePassword).to.have.been.called
		});

		it('should call RegisterAction.register with state and history', () => {
			RegisterActions.register = sinon.spy();
			const register = mount(<Register history='history'/>);
			const submit = register.find('form')
			submit.simulate('submit')
			expect(RegisterActions.register).to.have.been.called
			expect(RegisterActions.register).to.have.been.calledWith(register.state(), 'history')
		});
  });
})