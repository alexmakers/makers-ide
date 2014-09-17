var server = require('../../server');
var expect = require('expect.js')
var Browser = require('zombie');

describe('home page', function() {
  before(function() {
    this.server = server.listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  before(function(done) {
    this.browser.visit('/', done);
  });

  it('should show a welcome message', function(){
    expect(this.browser.text('h1')).to.eql('Welcome to Makers IDE');
  });
});