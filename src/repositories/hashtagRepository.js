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
  posts."urlImage",
  posts."urlDescription",
  posts."urlTitle",
  COUNT("likesPosts"."postId")::int AS likes,
  COUNT(comments."postId")::int AS "commentsCount"
  FROM users
  JOIN posts ON posts."writerId" = users.id
  JOIN "hashtagsPosts" ON "hashtagsPosts"."postId" = posts.id
  JOIN hashtags ON hashtags.id = "hashtagsPosts"."hashtagId"
  LEFT JOIN "likesPosts" ON posts.id = "likesPosts"."postId"
  LEFT JOIN comments ON posts.id = comments."postId"
  WHERE hashtags.name=$1
  GROUP BY posts.id, users.id
  ORDER BY posts.id DESC
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

async function getHashtags(name) {
  return connection.query(`SELECT * FROM "hashtags" WHERE "name" = $1`, [name]);
}

async function createHashtags(hashtagName) {
  return connection.query(`INSERT INTO "hashtags" ("name") VALUES ($1)`, [
    hashtagName,
  ]);
}

export const hashtagReposity = {
  getHashtageByName,
  getPostsByHashtag,
  getMostUsedHashtags,
  getHashtags,
  createHashtags,
};
