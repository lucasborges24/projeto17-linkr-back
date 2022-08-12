import connection from "../databases/postgres.js";

export const getUser = async (id) => {
  const sql = `--sql
  SELECT
    id,
    username,
    email,
    picture,
    "createdAt"
  FROM
    users
  WHERE
    id = $1;
  `;

  return await connection.query(sql, [id]);
};

export const getUserPostsById = async (id) => {
  const sql = `--sql
  SELECT
    users.username,
    users.picture,
    count("likesPosts".id) as likes,
    posts.description,
    posts.url
  FROM
    users
    JOIN posts ON posts."writerId" = users.id
    LEFT JOIN "likesPosts" ON "likesPosts"."postId" = posts.id
  WHERE
    users.id = $1
  GROUP BY
    posts.id,
    users.id
  `;

  return await connection.query(sql, [id]);
};

export const searchUsers = async (username) => {
  const sql = `--sql
  SELECT users."username", users.picture
  FROM users
  WHERE users."username" ILIKE $1;`;

  return await connection.query(sql, [`%${username}%`]);
};
