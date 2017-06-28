#! /bin/bash

bundle exec unicorn -c unicorn.rb &

cd ./src/webapp

npm run build