import connection from "../databases/postgres.js";
async function getHashtageByName(name) {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1`, [name]);
}
async function getPostsByHashtag(hashtag) {
  return connection.query(
    `
  SELECT posts.id,
  posts.url, 
  posts."createdAt",
  posts.description,
  users.id AS "writerId",
  users.username, 
  users.picture,
  COUNT("likesPosts"."postId") as likes
  FROM users
  JOIN posts ON posts."writerId" = users.id
  JOIN "hashtagsPosts" ON "hashtagsPosts"."postId" = posts.id
  JOIN hashtags ON hashtags.id = "hashtagsPosts"."hashtagId"
  LEFT JOIN "likesPosts" ON posts.id = "likesPosts"."postId"
  WHERE hashtags.name=$1
  GROUP BY posts.id, users.id
  ORDER BY posts."createdAt" DESC
  LIMIT 20
  `,
    [hashtag]
  );
}
async function getMostUsedHashtags(limit) {
  return connection.query(
    `
 SELECT hashtags.id, hashtags.name, COUNT("hashtagsPosts".id) AS count
 FROM "hashtagsPosts"
 JOIN hashtags ON hashtags.id = "hashtagsPosts"."hashtagId"
 GROUP BY hashtags.id, hashtags.name
 ORDER BY count DESC
 LIMIT $1
 `,
    [limit]
  );
}
export const hashtagReposity = {
  getHashtageByName,
  getPostsByHashtag,
  getMostUsedHashtags,
};
// COUNT("likesPosts") as likes
// JOIN "likesPosts" ON posts.id = "likesPosts"."postId"
// `
// SELECT
// posts.id,
// posts.description,
// posts.url,
// posts."createdAt",
// users.username,
// users.picture,
// count(likes."postId") AS likes
// FROM posts
// LEFT JOIN "likesPosts" ON posts.id = "likesPosts"."postsId"
// JOIN users ON users.id = posts.userId
// JOIN "hashtagsPosts" ON "hashtagsPosts" = posts.id
// JOIN hashtags ON hashtags.id = "hashtagsPosts".id
// WHERE hashtags.name =$1
// GROUP BY posts.id, users.id
// ORDER BY posts."createdAt" DESC
// LIMIT 20
// `[hashtag]
