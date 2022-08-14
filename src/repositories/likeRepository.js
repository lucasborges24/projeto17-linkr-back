import connection from "../databases/postgres.js";

async function insertLike(postId, userId) {
  return connection.query(
    `INSERT INTO "likesPosts" ("postId", "userId") VALUES($1, $2)`,
    [postId, userId]
  );
}

export const likeRepository = { insertLike };
