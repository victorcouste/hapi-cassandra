CREATE KEYSPACE IF NOT EXISTS services_ks WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE services_ks;

CREATE TABLE IF NOT EXISTS services (
  service_id uuid,
  title text static,
  description text static,
  date_creation timestamp static,
  duration int static,
  type text static,
  usage_date timestamp,
  username text,
  PRIMARY KEY (service_id,usage_date)
);
