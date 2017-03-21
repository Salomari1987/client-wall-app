import { mount, shallow } from 'enzyme';
import React from 'react';
jest.mock('../app/stores/WallStore');
jest.mock('../app/actions/WallActions');
import {expect} from 'chai';

import Wall from '../app/components/Wall';
import Message from '../app/components/Message';
import MessageInput from '../app/components/MessageInput';
import WallStore from '../app/stores/WallStore';
import WallActions from '../app/actions/WallActions';
import ReactDOM from 'react-dom';

describe('<Wall />', () => {
  var wall;
  beforeEach(function() {
    WallStore.getState.mockReturnValue({
      'token': '',
      'messages': [{'author': 'salomari', 'body': 'hi'}]
    });
    wall = mount(<Wall/>);
    Wall.prototype.scrollToBottom = jest.fn();
    spyOn(Wall.prototype, 'sendMessage');
  });

  it('does not contain a <MessageInput/> component when user is not logged in', function () {

    expect(wall.find(MessageInput)).to.have.length(0);
  });

  it('contains an <MessageInput/> component when user is logged in', function () {

    wall.setState({token: 'username'});  
    expect(wall.find(MessageInput)).to.have.length(1);
  });

  it('contains an <Message/> component when user is not logged in', function () {

    expect(wall.find(Message)).to.have.length(1);
  });
});