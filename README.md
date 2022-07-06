  This project aims at displaying crypto portfolio of a user by reading his/her transactions from a zipped csv file.


Backend libraries used:
1. axios
2. body-parser
3. express
4. extract-zip
5. fast-csv
6. moment
7. mysql
8. winston

Database : Since the input data is a CSV file with given columns and being structured MYSQL database has been used to load all the transaction data. In future, Cassandra can be used as the records can be partitioned based on the date value obtained from the timestamp field, thereby improving performance. There are three tables namely user(id, firstname, lastname, email), transaction(id, timestamp, transaction_type, token, amount, user_id), load_status(id, status,user_id). The dbSetup.js file under database directory takes care of creating all these tables.

Data Flow :
1. User registers himself/herself.
2. Zipped file containing the transactions is placed in the data directory.(Can be provisioned as an upload in the future)
3. The data is loaded onto the database.
4. User retrieves details as required about his/her portfolio by making requests to appropriate endpoints.

Logging : Winston library has been used to facilitate logging and the log outputs are generated under server/logs directory. There are two logs - server.log which logs all info, debug and error logs. error.log is used to log all the errors at once place for smoother debugging.

Configuration : All the configuration data is placed under config directory and the config.js is used to retreive configuration details across the entire project.

Endpoints :

    POST : /user/register => Registers the user
           Request Body : JSON containing firstname, lastname, email.
           Response Body: JSON containing id, firstname, lastname, email.
     
    GET : /user/:userId/load => Loads all the transaction data into the database.

    GET : /user/:userId/loadStatus => Returns the current status of the data load operation
       
    GET : /user/:userId/portfolio => Retruns the latest portfolio value per token in USD

    GET : /user/:userId/portfolio?date=YYYY-MM-DD => Returns the portfolio value per token in USD on the specified date

    GET : /user/:userId/portfolio/:token => Returns the latest portfolio value for the specified token in USD

    GET : /user/:userId/portfolio/:token?date=YYYY-MM-DD => Returns the portfolio value of the specified token in USD on the specified date

External APIs : Cryptocompare API has been used to retrieve the prices in USD.

Hope you enjoy this project. :-) 
