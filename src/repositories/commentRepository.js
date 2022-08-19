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

export const getPostComments = async (postId, userId) => {
  return await connection.query(
    `--sql
    SELECT 
      users.username,
      users.picture,
      users.id AS "commentWriterId",
      comments.comment,
      comments.id,
      CASE
        WHEN follows."followerId" = $2  THEN 'true'
        ELSE 'false'
    END :: BOOLEAN AS "isFollowing"
    FROM 
      users
      LEFT JOIN follows ON follows."followedId" = users.id
      JOIN comments ON comments."writerId"= users.id
    WHERE
      comments."postId" = $1
    `,
    [postId, userId]
  );
};
