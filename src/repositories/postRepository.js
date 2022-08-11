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
async function deletePostByIdOnHashtagsPosts(id) {
  return connection.query(`DELETE FROM "hashtagsPosts" WHERE "postId" =$1`, [
    id,
  ]);
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
export const postRepository = {
  getPostById,
  deletePostById,
  deletePostByIdOnHashtagsPosts,
  updatePost,
};
