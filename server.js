var app = require('express')();
var server = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

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

  fs.writeFile('code/' + fileName, request.body.content, function () {
    response.redirect('/edit?file=' + fileName);
  });
});


var userCount = 0;

function updateUserCount(change) {
  userCount += change;
  io.emit('userCountChanged', userCount)
}

io.on('connect', function(socket){

  // Update the user count
  updateUserCount(+1);

  socket.on('disconnect', function(){
    updateUserCount(-1);
  })

  socket.on('textUpdated', function(file){
    fs.writeFile('code/' + file.name, file.content);
    io.emit('fileChanged', file.content);
  })
})

module.exports = server;
if (!module.parent) {
  console.log('Server running on http://localhost:3000')
  server.listen(3000)
}