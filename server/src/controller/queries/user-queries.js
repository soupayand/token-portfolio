const addUser = "insert into user(firstname,lastname) values(?,?)";
const getUserByFirstLastName =
  "select * from user where firstname = ? and lastname = ?";

module.exports = {
  addUser,
  getUserByFirstLastName,
};
