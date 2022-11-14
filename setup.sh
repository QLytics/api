#!/bin/bash

yarn wrangler d1 execute near --file ./src/sql/block.sql
yarn wrangler d1 execute near --file ./src/sql/chunk.sql
