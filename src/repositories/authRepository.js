import connection from "../databases/postgres.js";

export const getUserByEmail = async (email) => {
  const sql = `--sql
  SELECT
      *
  FROM
      "users"
  WHERE
      "email" = $1;`;
  return await connection.query(sql, [email]);
};

export const getUserByUsername = async (username) => {
  const sql = `--sql
    SELECT
        *
    FROM
        "users"
    WHERE
        "username" = $1;`;
  return await connection.query(sql, [username]);
};

export const insertUserinUsers = async (userObject) => {
  const { email, password, username, picture } = userObject;
  const sql = `--sql
        INSERT INTO
            "users" ("email", "password", "username", "picture")
        VALUES
            ($1, $2, $3, $4);
    `;
  return connection.query(sql, [email, password, username, picture]);
};
