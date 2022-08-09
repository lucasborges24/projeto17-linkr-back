import connection from "../databases/postgres.js";
async function getHashtageByName(name) {
  return connection.query(`SELECT * FROM hashtags WHERE name = $1`, [name]);
}
async function getPostsByHashtag(hashtag) {
  return connection.query(
    `
  SELECT posts.id , posts.description, posts."createdAt", users.username, users.picture, count(likes."postId") AS likes
  FROM posts
  JOIN users ON users.id = posts.userId
  JOIN "hashtagsPosts" ON "hashtagsPosts" = posts.id
  JOIN hashtags ON hashtags.id = "hashtagsPosts".id
  WHERE hashtags.name =$1
  GROUP BY posts.id, users.id
  ORDER BY posts."createdAt" DESC
  LIMIT 10
  `[hashtag]
  );
}
async function getMostUsedHashtags(limit) {
  return connection.query(
    `
 SELECT hashtags.id, hashtags.name, COUNT("hastagsPosts".id) AS count
 FROM "hashtagsPosts"
 JOIN hashtags ON "hashtagsPosts".id
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
