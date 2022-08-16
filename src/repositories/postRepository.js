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
    GROUP BY
      p."id",
      u."id"
    ORDER BY
      p.id DESC LIMIT 20`
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
};
