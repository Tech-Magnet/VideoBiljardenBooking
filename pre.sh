#!/bin/bash

service apache2 stop
rm -r /var/www/html/
cp -r ./public/ /var/www/html/
service apache2 start