#!/bin/bash

command=""
search_dir=./src/sql/
for entry in "$search_dir"*
do
  cat $entry >> ./src/sql/bundle.sql
done

yarn wrangler d1 execute near --file ./src/sql/bundle.sql
rm ./src/sql/bundle.sql
