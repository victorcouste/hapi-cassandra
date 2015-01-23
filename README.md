
#REST API on top of Cassandra database with hapi Nodejs framework


##Installation

- Copy all js files in a directory

- Install **Nodejs** : depending of your OS see https://github.com/joyent/node/wiki/installation for installation instructions

  Create your nodejs project
  - ```
  $npm init```


- Install **hapi** a server framework for builing application and services (rest api) for nodejs http://hapijs.com/

  - ```
  $npm install hapi -save```

- Install **joi** hapi plugin for object schema validation https://github.com/hapijs/joi

  - ```
  $npm init
  $npm install --save joi```

- Install **Cassandra Nodejs driver** from https://github.com/datastax/nodejs-driver
  - ```
  $npm install --save cassandra-driver```

- In your Cassandra cluster, create the keyspace and tables

##Usage

- Run HTTP Nodejs server

  - ```
  $node server.js```

- Test the REST API

  - In command line with curl

  - ```
  $curl  ```

  - With a Web browser

      http://localhost:3002/users

  - With a REST client like Postman for http://www.getpostman.com/
