
var Hapi = require('hapi');
var services_routes = require('./services');

// Create a server with a host and port
var server = new Hapi.Server();
  server.connection({
  host: '0.0.0.0',
  port: 3000
});


server.route(services_routes);

server.start(
  function() { console.log('Hapi is listening to http://localhost:3000'); }
);
