#!/bin/sh

for var in $(cat .env)
do
    echo export environment variable $(echo $var | cut -d= -f1)
    export $var
done

node index.js
