var server = require('../../server');
var expect = require('expect.js')
var Browser = require('zombie');
var fs = require('fs');

describe('home page', function() {
  var browser;
  
  before(function() {
    this.server = server.listen(3000);
    // initialize the browser using the same port as the test application
    browser = new Browser({ site: 'http://localhost:3000' });
    fs.writeFile('code/_test.txt', 'Lorem ipsum');
  });

  before(function(done) {
    browser.visit('/', done);
  });

  after(function() {
    fs.unlink('code/_test.txt');
  })

  it('should show a welcome message', function(){
    expect(browser.text('h1')).to.eql('Welcome to Makers IDE');
  });

  it('should show a file picker', function(){
    expect(browser.text('.files a:first-child')).to.eql('_test.txt');
  });

  it('takes you to an edit page when a file is selected', function(){
    browser.clickLink('_test.txt', function(){
      expect(browser.location.pathname).to.eql('/edit?file=_test.txt');
    })
  })
});