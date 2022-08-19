import connection from "../databases/postgres.js";

async function getPostById(id) {
  return connection.query(
    `
  SELECT * FROM posts
  WHERE posts.id=$1
  `,
    [id]
  );
}
async function deletePostById(id) {
  return connection.query(`DELETE FROM posts WHERE id =$1`, [id]);
}

async function updatePost(description, id) {
  return connection.query(
    `
    UPDATE posts 
    SET description=$1,
    "editedAt"=NOW() 
    WHERE id=$2
    `,
    [description, id]
  );
}
async function getAllPosts() {
  return connection.query(
    `SELECT
      u."username",
      u."picture",
      u."id" as "userId",
      p."id" as "postId",
      p."url",
      p."description",
      p."createdAt" AS "postCreatedAt",
      p."editedAt",
      COUNT("likesPosts"."id")::int as "likes",
      COUNT("sharedPosts"."id")::int as "shares",
      COUNT(comments."postId")::int AS "commentsCount",
      p."urlTitle",
      p."urlDescription",
      p."urlImage",
      p."sharedBy"
    FROM (
			SELECT *, NULL AS "sharedBy" FROM posts
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
			)
			ORDER BY "createdAt" DESC
     ) p
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
      p."createdAt" DESC `
  );
}

async function deleteHashtagsPosts(postId) {
  const sql = `--sql
  DELETE FROM
    "hashtagsPosts"
  WHERE
    "postId" = $1;
    `;
  return connection.query(sql, [postId]);
}

async function getPostByUserId(userId) {
  const sql = `--sql
  SELECT
    posts."id", posts."createdAt"

  FROM
    users
    JOIN posts ON users."id" = posts."writerId"
  WHERE
    users."id" = $1
  ORDER BY
     posts."id" DESC
   LIMIT
     1;
  `;
  return connection.query(sql, [userId]);
}

async function getUrlPost(id) {
  return connection.query(`SELECT p."url" FROM "posts" p WHERE p."id" = $1`, [
    id,
  ]);
}

async function insertPost(
  userId,
  url,
  description,
  urlTitle,
  urlDescription,
  urlImage
) {
  return connection.query(
    `INSERT INTO "posts" ("writerId", "url","description", "urlTitle", "urlDescription", "urlImage" ) VALUES($1,$2,$3,$4, $5, $6)`,
    [userId, url, description, urlTitle, urlDescription, urlImage]
  );
}

async function insertHashtagPost(postId, hashtagId) {
  return connection.query(
    `INSERT INTO "hashtagsPosts" ("postId", "hashtagId") VALUES($1,$2)`,
    [postId, hashtagId]
  );
}

async function insertSharedPost(postId, userId) {
	const query = `
		INSERT INTO "sharedPosts"
			("postId", "userId") 
		VALUES 
			($1, $2)
	`;
	return connection.query(
		query,
		[postId, userId]
	);
}

export const postRepository = {
  getAllPosts,
  getUrlPost,
  insertPost,
  insertHashtagPost,
  getPostByUserId,
  getPostById,
  deletePostById,
  updatePost,
  deleteHashtagsPosts,
  insertSharedPost,
};