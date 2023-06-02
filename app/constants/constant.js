/******************************************************************************
 *  @description    : Contant file for all the fix values
 *  @author         : Bhupendra Singh
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/

// Exporting the constants as a class
export class Constants {
  static USER_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL,
  user_name VARCHAR(50) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  post VARCHAR(250)[],
  created_on DATE NOT NULL,
  verification BOOLEAN DEFAULT false)`
  static DROP_TABLE = 'DROP TABLE IF EXISTS users'

  static USER_POST_TABLE_CREATION = `CREATE TABLE IF NOT EXISTS userPost (
    user_id VARCHAR(100),
    user_name VARCHAR(50) UNIQUE NOT NULL,
    hide BOOLEAN,
    likes VARCHAR[],
    share VARCHAR[],
    comment VARCHAR[],
    creation_time TIMESTAMP
  );`;

  static REGISTER_QUERY = `INSERT INTO
      users(email, user_name, first_name, last_name, password, post, created_on)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`;

  static LOGIN_QUERY = 'SELECT * FROM users WHERE email = $1';
  static FETCHDATA_QUERY = `
  UPDATE users
  SET verification = true
  WHERE email = $1 AND id = $2
  RETURNING *;
`;
  static DELETE_QUERY = 'DELETE FROM users WHERE email = $1';
  static UPDATE_QUERY = ''; // Add your update query here
  static GETALLUSER_QUERY = 'SELECT * FROM users;'
  static RESETPASS_QUERY = `UPDATE users SET password = $1 WHERE email = $2 RETURNING *`;
}
