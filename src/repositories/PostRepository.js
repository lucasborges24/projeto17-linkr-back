import connection from "../databases/postgres.js";

async function getAllPosts() {
  return connection.query(
    `SELECT * FROM posts ORDER BY "createdAt" DESC LIMIT 20`
  );
}

async function getUrlPost(id) {
  return connection.query(`SELECT p."url" FROM "posts" p WHERE p."id" = $1`, [
    id,
  ]);
}

async function insertPost(writerId, url, description, createdAt) {
  return connection.query(
    `INSERT INTO "posts" ("writerId", "url","description","createdAt") VALUES($1,$2,$3,$4)`,
    [writerId, url, description, createdAt]
  );
}

export const postRepository = {
  getAllPosts,
  getUrlPost,
  insertPost,
};
