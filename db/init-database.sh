#!/bin/bash
psql -U postgres -d clinica_fenix_db -f /docker-entrypoint-initdb.d/migrations/01_init.sql
