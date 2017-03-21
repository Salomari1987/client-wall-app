import React from 'react';
import {shallow} from 'enzyme';

import Home from '../app/containers/Home';

test('Home exists', () => {

  const home = shallow(
    <Home />
  );

  expect(home.text()).toEqual('Hello from Home Components');
});

