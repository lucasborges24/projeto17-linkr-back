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
    u."id" as "userId",
    p."id" as "postId",
    p."url",
    p."description",
    p."createdAt",
    p."editedAt",
    COUNT("likesPosts"."id")::int as "likes",
    p."urlTitle",
    p."urlDescription",
    p."urlImage"
  FROM
    posts p
    JOIN users u ON p."writerId" = u."id"
    LEFT JOIN "likesPosts" ON "likesPosts"."postId" = p.id
  WHERE
    u.id = $1
  GROUP BY
    p."id",
    u."id"
  ORDER BY
    p.id DESC
  `;

  return await connection.query(sql, [id]);
};

export const searchUsers = async (username, userId) => {
  const sql = `--sql
  SELECT
	DISTINCT ON (users.id) users.id,
	users."username",
	users.picture,
	CASE
		WHEN follows."followerId" = $1 THEN 'true'
		ELSE 'false'
	END :: BOOLEAN AS "isFollowing"
  FROM
    users
    LEFT JOIN follows ON follows."followedId" = users.id
  WHERE
    users."username" ILIKE $2
  ORDER BY
    users.id,
    "isFollowing" desc`;

  return await connection.query(sql, [userId, `%${username}%`]);
};
