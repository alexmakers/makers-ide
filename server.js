var app = require('express')();
var server = require('http').Server(app);
var fs = require('fs');

app.set('view engine', 'ejs');

app.get('/', function(request, response){
  fs.readdir('code', function(err, files) {
    response.render('index', { files: files })
  })
});

app.get('/edit', function(request, response){
  var fileName = request.query.file
  fs.readFile('code/' + fileName, function (err, data) {
    if (err) {
      response.render('error')
    } else {
      response.render('edit', { fileName: fileName, fileContents: data });
    }
  });
});

app.post('/save', function(request, response){
  var fileName = request.query.file;
  response.redirect('/edit?file=' + fileName);
});

module.exports = server;
if (!module.parent) {
  console.log('Server running on http://localhost:3000')
  server.listen(3000)
}