var app = require('express')();
var server = require('http').Server(app);

app.set('view engine', 'ejs');

app.get('/', function(request, response){
  response.render('index')
});

module.exports = server;
if (!module.parent) {
  console.log('Server running on http://localhost:3000')
  server.listen(3000)
}