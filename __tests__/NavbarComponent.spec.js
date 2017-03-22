import { mount, shallow } from 'enzyme';
import React from 'react';
import {Link} from 'react-router';
import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import NavbarComponent from '../app/containers/NavbarContainer';

import { Nav, Navbar, NavItem, Header, Brand} from 'react-bootstrap';

chai.use(sinonChai);

describe('<NavbarComponent />', () => {

  it('does not contain a <NavItem /> element', function () {
    const navbarcomp = mount(<NavbarComponent />);
    const navitem = navbarcomp.find(NavItem);
    expect(navitem).to.have.length(5);
  });

  it('does not contain <Navbar.brand /> elements', function () {
    const navbarcomp = mount(<NavbarComponent />);
    const navbrand = navbarcomp.find(Navbar.Brand);
    expect(navbrand).to.have.length(1);
  });
});
