'use strict';
/**
 * Module dependencies.
 */

var express       = require('express')
  , routes        = require('./routes')
  , app           = module.exports                    = express.createServer()
  , io            = require('socket.io').listen(app);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var activeSocks = {};
io.sockets.on('connection', function(socket) {
  var i, el;

  socket.broadcast.emit('uconnect', socket.id);

  for (i in activeSocks) {
    if (activeSocks.hasOwnProperty(i)) {
      socket.emit('uconnect', i);
    }
  }
  activeSocks[socket.id] = socket;
  
  socket.on('sync', function(loc){
    loc.id = socket.id;
    socket.broadcast.volatile.emit('sync', loc);
  });
  socket.on('disconnect', function() {
    var id = socket.id;

    delete activeSocks[id];
    socket.broadcast.emit('udconnect', id);
  });
});



// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
