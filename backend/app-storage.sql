\echo 'Delete and recreate the app-storage database?'
\prompt 'Return for yes or Ctrl-C to cancel > ' answer

DROP DATABASE app_storage;
CREATE DATABASE app_storage;
\connect app_storage;

\i app-storage-schema.sql