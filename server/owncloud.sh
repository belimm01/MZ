#!/bin/bash

docker exec owncloud /bin/sh -c "cd config;
sed -ie '/'datadirectory'/a  '\''cors.allowed-domains'\'' => [ '\''http://localhost:8080'\'', ],' config.php; exit;
exec bash;"