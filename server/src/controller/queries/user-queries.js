const addUser = "insert into user(firstname,lastname) values(?,?)";

const getUserByFirstLastName =
  "select * from user where firstname = ? and lastname = ?";

const loadTransactionData =
  "insert into transaction(timestamp,transaction_type,token,amount,user_id) values (?)";

const insertLoadStatusData =
  "insert into load_status(status, user_id) values ('NONE',?)";

const updateLoadStatus = "update load_status set status = ? where user_id = ?";

const getLoadStatus = "select status from load_status where user_id = ?";

module.exports = {
  addUser,
  getUserByFirstLastName,
  loadTransactionData,
  insertLoadStatusData,
  updateLoadStatus,
  getLoadStatus,
};
