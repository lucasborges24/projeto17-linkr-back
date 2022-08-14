import connection from "../databases/postgres.js";

async function insertLike(postId, userId) {
  return connection.query(
    `INSERT INTO "likesPosts" ("postId", "userId") VALUES($1, $2)`,
    [postId, userId]
  );
}

async function getLike(postId, userId) {
  return connection.query(
    `SELECT * FROM "likesPosts" WHERE "postId" = $1 AND "userId" = $2`,
    [postId, userId]
  );
}

async function removeLike(postId, userId) {
  return connection.query(
    `DELETE FROM "likesPosts" WHERE "postId" = $1 AND "userId" = $2`,
    [postId, userId]
  );
}

async function getLikesPost(postId) {
  return connection.query(
    `SELECT username FROM users JOIN "likesPosts" ON "likesPosts"."userId" = users.id WHERE "likesPosts"."postId" = $1 ORDER BY "likesPosts"."id" DESC`,
    [postId]
  );
}

export const likeRepository = { insertLike, getLike, removeLike, getLikesPost };
