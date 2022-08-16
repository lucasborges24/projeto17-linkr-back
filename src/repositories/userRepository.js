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
    u."username",
    u."picture",
    u."id" as "userId",
    p."id" as "postId",
    p."url",
    p."description",
    p."createdAt",
    p."editedAt",
    COUNT("likesPosts"."id") as "likes",
    COUNT(comments."postId") AS "commentsCount",
    p."urlTitle",
    p."urlDescription",
    p."urlImage"
  FROM
    posts p
    JOIN users u ON p."writerId" = u."id"
    LEFT JOIN "likesPosts" ON "likesPosts"."postId" = p.id
    LEFT JOIN comments ON p.id = comments."postId"
  WHERE
    u.id = $1
  GROUP BY
    p."id",
    u."id"
  ORDER BY
    "createdAt" DESC
  `;

  return await connection.query(sql, [id]);
};

export const searchUsers = async (username) => {
  const sql = `--sql
  SELECT users.id, users."username", users.picture
  FROM users
  WHERE users."username" ILIKE $1;`;

  return await connection.query(sql, [`%${username}%`]);
};
