import dateparser from '../app/services/dateparser.js';

import chai from 'chai';
import {expect} from 'chai';

describe('dateparser', () => { 
  it('should return "1 week ago"', () => {
    var date = new Date();
    date = date - 777600000;
    date = new Date(date);
    expect(dateparser.parsedate(date)).to.equal('1 week ago');
  });

  it('should return "1 day ago"', () => {
    var date = new Date();
    date = date - 129600000;
    date = new Date(date);
    expect(dateparser.parsedate(date)).to.equal('1 day ago');
  });

  it('should return "one minute ago"', () => {
    var date = new Date();
    date = date - 90000;
    date = new Date(date);
    expect(dateparser.parsedate(date)).to.equal('one minute ago');
  });

  it('should return "5 seconds ago"', () => {
    var date = new Date();
    date = date - 5000;
    date = new Date(date);
    expect(dateparser.parsedate(date)).to.equal('5 seconds ago');
  });

  it('should return "on " + date', () => {
    var date = new Date();
    date = date - 8000000000;
    date = new Date(date);
    expect(dateparser.parsedate(date)).to.equal('on ' + date);
  });
});