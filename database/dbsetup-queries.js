const createDatabase = "create database portfolio";

const createUserTbl =
  "create table if not exists user(id int primary key auto_increment, firstname varchar(255) not null, lastname varchar(255))";

const createTransactionTbl =
  "create table if not exists transaction(id int primary key auto_increment,timestamp bigint, transaction_type ENUM('DEPOSIT','WITHDRAWAL'),token varchar(255), amount decimal(10,8), user_id int, foreign key (user_id) references user(id))";

const dataLoadStatusTbl =
  "create table if not exists load_status (id int primary key auto_increment, status ENUM('STARTED','COMPLETED','IN_PROGRESS','NONE'), user_id int, foreign key (user_id) references user(id))";
module.exports = {
  createDatabase,
  createUserTbl,
  createTransactionTbl,
  dataLoadStatusTbl,
};
