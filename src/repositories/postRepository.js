import connection from "../databases/postgres.js";

async function getAllPosts() {
  return connection.query(
    `SELECT u."username", u."picture", p."id" as "postId", p."url", p."description", p."createdAt", p."editedAt", COUNT("likesPosts"."id") as "likes" FROM posts p JOIN users u ON p."writerId" = u."id" LEFT JOIN "likesPosts" ON "likesPosts"."postId" = p.id GROUP BY p."id", u."id" ORDER BY "createdAt" DESC`
  );
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
};
