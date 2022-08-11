import connection from "../databases/postgres.js";

export const getUserPostsById = async (id) => {
  const sql = `--sql
  select users.username, users.picture, posts.* from users join posts on posts."writerid" = users.id
where users.id = $1;`;

  return await connection.query(sql, [id]);
};

export const searchUsers = async (username) => {
  const sql = `--sql
  SELECT users."userName" AS username, users.picture
  FROM users
  WHERE users."userName" ILIKE $1;`;

  return await connection.query(sql, [`%${username}%`]);
};
