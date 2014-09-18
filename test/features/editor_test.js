process.env.NODE_ENV = 'test';
var server = require('../../server');
var expect = require('expect.js')
var Browser = require('zombie');
var fs = require('fs');

describe('editor page', function() {
  var browser;
  
  before(function() {
    this.server = server.listen(3000);
    // initialize the browser using the same port as the test application
    browser = new Browser({ site: 'http://localhost:3000' });
    fs.writeFile('code/_test.txt', 'Lorem ipsum');
  });

  after(function() {
    fs.unlink('code/_test.txt');
  })

  describe('editing a non-existent file', function() {
    before(function(done) {
      browser.visit('/edit?file=nonsense.txt', done);
    });

    it('displays an error message', function(){
      expect(browser.text('h1')).to.eql('File not found');
    })
  })

  describe('editing an existent file', function() {
    before(function(done) {
      browser.visit('/edit?file=_test.txt', done);
    });

    it('displays an edit page', function(){
      expect(browser.text('h1')).to.eql('Editing _test.txt');
    });

    it('prepopulates the page with the current contents of the file', function(){
      expect(browser.text('textarea')).to.eql('Lorem ipsum');
    });

    describe('saving changes', function() {
      before(function(done){
        browser.fill("textarea", 'Hello').
        pressButton('Save', done)
      })

      it('writes the changes to the file', function(){
        expect(fs.readFileSync('code/_test.txt', 'utf8')).to.eql('Hello')
      })
    });
  });
});