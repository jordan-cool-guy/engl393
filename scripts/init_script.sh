#!/bin/bash
unset MYSQL_HOST
unset MYSQL_PORT


echo "creating table"

mysql -u user -ppass banana_db <<SQL
CREATE TABLE IF NOT EXISTS new_table (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, age INT);
SQL