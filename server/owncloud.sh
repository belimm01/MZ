#!/bin/bash

docker exec $1 /bin/sh -c "cd config;
sed -ie '/'datadirectory'/a  '\''cors.allowed-domains'\'' => [ '\''http://localhost:8080'\'', ],' config.php; exit;
exec bash;"