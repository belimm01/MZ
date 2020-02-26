#!/bin/bash

if [ -z "$1" ]; then
  echo "Error: Docker name not supplied" >&2
  echo "Usage: ./owncloud.sh <docker container name>"
  exit 1
fi

docker exec $1 /bin/sh -c "cd config;
sed -ie '/'datadirectory'/a  '\''cors.allowed-domains'\'' => [ '\''http://localhost:8080'\'', '\''http://localhost:8081'\''],' config.php; exit;
exec bash;"