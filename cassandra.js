var cassandra = require('cassandra-driver');

module.exports = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'services_ks'});
