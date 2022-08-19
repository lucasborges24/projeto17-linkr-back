import connection from "../databases/postgres.js";

export const insertComment = async (writerId, postId, comment) => {
  return await connection.query(
    `--sql
  INSERT INTO
    comments
  ("writerId","postId", comment)
  VALUES ($1, $2, $3)
  `,
    [writerId, postId, comment]
  );
};

export const getPostComments = async (postId) => {
  return await connection.query(
    `--sql
    SELECT 
      users.username,
      users.picture,
      users.id AS "commentWriterId",
      comments.comment,
      comments.id
    FROM 
      comments
      JOIN users ON users.id = comments."writerId"
    WHERE
      comments."postId" = $1
    `,
    [postId]
  );
};
