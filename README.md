
#REST API on top of Cassandra database with hapi Nodejs framework



##Installation

- You need a Cassandra cluster running, for download and installation instructions  http://planetcassandra.org/cassandra/

- Clone all js files in a directory

- Install **Nodejs** : depending of your OS see https://github.com/joyent/node/wiki/installation for installation instructions

  Create your nodejs project
  ```
  $npm init
  ```


- Install **hapi** a server framework for builing application and services (rest api) for nodejs http://hapijs.com/

  ```
  $npm install hapi -save
  ```

- Install **joi** hapi plugin for object schema validation https://github.com/hapijs/joi

  ```
  $npm install --save joi
  ```

- Install **Cassandra Nodejs driver** from https://github.com/datastax/nodejs-driver
  ```
  $npm install --save cassandra-driver
  ```

- In your Cassandra cluster, create the keyspace and tables

##Using

- Run HTTP Nodejs server

  ```
  $node server.js
  ```

- Test the REST API

  - In command line with curl


  Create a service
  ```
  $ curl -X POST -H "Content-Type: application/json" -d '{"title":"The best service"}' http://localhost:3000/service/create -i
  ```

  Add a user using this service
  ```  
  $ curl -X POST -H "Content-Type: application/json" -d '{"id":"d0f60aa8-54a9-4840-b70c-fe562b68842b","user":"victor"}' http://localhost:3000/service/user -i
  ```

  Get all users for a service
  ```
  $ curl -X GET http://localhost:3000/service/d0f60aa8-54a9-4840-b70c-fe562b68842b -i
  ```

  Get all services
  ```  
  $ curl -X GET http://localhost:3000/services -i
  ```

  Delete a service
  ```
  $ curl -X DELETE http://localhost:3000/service/delete/c391b62c-5e72-4e5d-ae74-6a5acd0a3ac3 -i
  ```

  - With a Web browser

      http://localhost:3000/services

  - With a REST client like Postman for http://www.getpostman.com/
