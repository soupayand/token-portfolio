const createDatabase = "create database portfolio";

const createUserTbl =
  "create table if not exists user(id int primary key auto_increment, firstname varchar(255) not null, lastname varchar(255))";

const createTransactionTbl =
  "create table if not exists transaction(id int primary key auto_increment,timestamp int, transaction_type ENUM('DEPOSIT','WITHDRAWAL'),token varchar(255), amount decimal(8,8), user_id int, foreign key (user_id) references user(id));";

module.exports = {
  createDatabase,
  createUserTbl,
  createTransactionTbl,
};
