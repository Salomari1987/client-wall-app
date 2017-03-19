import React from 'react';
import {shallow} from 'enzyme';

import Home from '../app/components/Home.jsx';

test('Home exists', () => {

  const home = shallow(
    <Home />
  );

  expect(home.text()).toEqual('Hello from Home Components');
});

