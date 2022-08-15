import connection from "../databases/postgres.js";

export async function getUsernamesLikedPost(postId) {
  const sql = `--sql
    SELECT
      username
    FROM
      users
    JOIN "likesPosts" ON "likesPosts"."userId" = users.id
    WHERE
    "likesPosts"."postId" = $1
    `;

  return await connection.query(sql, [postId]);
}
