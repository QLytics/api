#!/bin/bash

command=""
search_dir=./src/sql/
for entry in "$search_dir"*
do
  command+=$'\n'
  command+="$(cat $entry)"
done
echo $command >> ./src/sql/bundle.sql

yarn wrangler d1 execute near --file ./src/sql/bundle.sql
rm ./src/sql/bundle.sql
