#!/usr/bin/env bash

function test_connection {
    echo "Testing $1 connection"
    exec 10<>/dev/tcp/$2/$3
    STATUS=$?
    I=0

    while [[ ${STATUS} -ne 0  && ${I} -lt 50 ]]; do
        echo "Connection refused, retrying in 5 seconds..."
        sleep 5

        exec 10<>/dev/tcp/$2/$3
        STATUS=$?

        I=${I}+1
    done

    exec 10>&- # close output connection
    exec 10<&- # close input connection

    if [[ ${STATUS} -ne 0 ]]; then
        echo "It has not been possible to connect to $1"
        exit 1
    fi

    echo "$1 connection, OK"
}

function get_protocol {
  local ssl_enabled=$1
  case $ssl_enabled in
    true|1|t) echo "https" ;;
    false|0|f) echo "http" ;;
    *) echo "${1} is not a bool" >&2; exit 1 ;;
  esac
}

# Wait for mongodb to be running
test_connection 'MongoDB' ${MONGO_HOST} ${MONGO_PORT}

# Get glassfish host and port from config
GLASSFISH_HOST=${ENDPOINT_INVENTORY_HOST}
GLASSFISH_PORT=${ENDPOINT_INVENTORY_PORT}

# Wait for glassfish to be running
test_connection 'Glassfish' ${GLASSFISH_HOST} ${GLASSFISH_PORT}

# Wait for APIs to be deployed
GLASSFISH_SCH=$(get_protocol "$ENDPOINT_INVENTORY_APP_SSL")
GLASSFISH_PATH=${ENDPOINT_INVENTORY_PATH}

echo "Testing Glasfish APIs deployed"
wget ${GLASSFISH_SCH}://${GLASSFISH_HOST}:${GLASSFISH_PORT}/${GLASSFISH_PATH}
STATUS=$?
I=0
while [[ ${STATUS} -ne 0  && ${I} -lt 50 ]]; do
    echo "Glassfish APIs not deployed yet, retrying in 5 seconds..."

    sleep 5
    wget ${GLASSFISH_SCH}://${GLASSFISH_HOST}:${GLASSFISH_PORT}/${GLASSFISH_PATH}
    STATUS=$?

    I=${I}+1
done

# Include this setting to avoid inconsistencies between docker container port and used port
sed -i "s|config\.port|config\.extPort|" /business-ecosystem-logic-proxy/lib/tmfUtils.js

echo "Creating indexes..."
node fill_indexes.js
node collect_static.js

node server.js
