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
    COUNT("sharedPosts"."id")::int as "shares",
    COUNT(comments."postId")::int AS "commentsCount",
    p."urlTitle",
    p."urlDescription",
    p."urlImage",
	p."sharedBy"
  FROM
    (SELECT *, NULL AS "sharedBy" FROM posts WHERE "writerId" = $1
		UNION ALL (
			SELECT b.id,
				b."writerId",
				b.url,
				b.description,
				a."createdAt",
				b."editedAt",
				b."urlImage",
				b."urlDescription",
				b."urlTitle",
				c.username AS "sharedBy"
			FROM "sharedPosts" "a"
			JOIN posts b
			ON b.id = a."postId"
			JOIN users "c"
			ON a."userId" = c.id
			WHERE a."userId" = $1
		)
		ORDER BY "createdAt" DESC) p
    JOIN users u ON p."writerId" = u."id"
    LEFT JOIN "likesPosts" ON "likesPosts"."postId" = p.id
	  LEFT JOIN "sharedPosts" ON "sharedPosts"."postId" = p.id
    LEFT JOIN comments ON p.id = comments."postId"
  GROUP BY
    p."id",
	p."url",
	p."description",
	p."createdAt",
	p."editedAt",
	p."urlTitle",
	p."urlDescription",
	p."urlImage",
	p."sharedBy",
    u."id"
  ORDER BY
    p.id DESC
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
