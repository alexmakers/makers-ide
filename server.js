var app = require('express')();
var server = require('http').Server(app);
var fs = require('fs');

app.set('view engine', 'ejs');

app.get('/', function(request, response){
  fs.readdir('code', function(err, files) {
    response.render('index', { files: files })
  })
});

module.exports = server;
if (!module.parent) {
  console.log('Server running on http://localhost:3000')
  server.listen(3000)
}