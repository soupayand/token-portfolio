getAllTokenQuantity = (where) => {
  let query =
    "SELECT SUM(CASE WHEN transaction_type = 'DEPOSIT' then amount WHEN transaction_type = 'WITHDRAWAL' then -amount END) AS quantity, token FROM transaction ";
  if (where) {
    query = query + where;
  }
  query = query + " GROUP BY token, user_id";
  return query;
};

getTokenQuantity = (where) => {
  let query =
    "SELECT SUM(CASE WHEN transaction_type = 'DEPOSIT' then amount WHEN transaction_type = 'WITHDRAWAL' then -amount END) AS quantity, token FROM transaction ";
  if (where) {
    query = query + where;
  }
  query = query + " GROUP BY user_id";
  return query;
};

module.exports = {
  getTokenQuantity,
  getAllTokenQuantity,
};
