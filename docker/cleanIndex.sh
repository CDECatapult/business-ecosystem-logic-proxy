#!/bin/bash

echo "Cleaning indexes"

cd /business-ecosystem-logic-proxy || exit

rm -rf ./indexes/*
echo $? 2>&1

node ./fill_indexes.js
echo $? 2>&1

exit 0
