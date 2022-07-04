CREATE USER 'user'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'userpassword';
GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';
FLUSH PRIVILEGES;