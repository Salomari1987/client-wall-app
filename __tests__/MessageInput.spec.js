import { mount, shallow } from 'enzyme';
import React from 'react';
import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import MessageInput from '../app/components/MessageInput';
chai.use(sinonChai);

describe('<MessageInput />', () => {
  
  it('does not contain a <MessageInput/> component when user is not logged in', function () {
    var sendMessage = sinon.spy();
    const input = mount(<MessageInput sendMessage={sendMessage}/>);
    input.find('button').simulate('submit');
    expect(sendMessage).to.have.been.called;
  });

  it('does not contain a <MessageInput/> component when user is not logged in', function () {
    var updateMessage = sinon.spy();
    var sendMessage = sinon.spy();
    const input = mount(<MessageInput updateMessage={updateMessage} sendMessage={sendMessage}/>);
    var event = {target: {value: 'My new value'}};
    input.find('input').simulate('change', event);

    expect(updateMessage).to.have.been.called;
  });
});