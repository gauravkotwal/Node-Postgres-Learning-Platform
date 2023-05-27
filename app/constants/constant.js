/******************************************************************************
 *  @description    : Contant file for all the fix values
 *  @author         : Bhupendra Singh
 *  @version        : 1.0
 *  @since          : 22-may-2023
 ******************************************************************************/

// Exporting the constants as a class
export class Constants {
    static REGISTER_QUERY = `INSERT INTO
      users(email, first_name, last_name, password, created_on)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`;

    static LOGIN_QUERY = 'SELECT * FROM users WHERE email = $1';
    static DELETE_QUERY = 'DELETE FROM users WHERE email = $1';
    static UPDATE_QUERY = ''; // Add your update query here
    static GETALLUSER_QUERY = 'SELECT * FROM users;'
}
