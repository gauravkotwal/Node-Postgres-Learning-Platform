/******************************************************************************
 *  @description    : Contant file for all the fix values
 *  @author         : Bhupendra Singh
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/

// Exporting the constants as a class
export class Constants {
  static TABLE_CREATION = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL,
  verification BOOLEAN DEFAULT false)`
  static DROP_TABLE = 'DROP TABLE IF EXISTS users'

  static REGISTER_QUERY = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`;

  static LOGIN_QUERY = 'SELECT * FROM users WHERE email = $1';
  static DELETE_QUERY = 'DELETE FROM users WHERE email = $1';
  static UPDATE_QUERY = ''; // Add your update query here
  static GETALLUSER_QUERY = 'SELECT * FROM users;'
}
