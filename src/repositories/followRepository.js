import connection from "../databases/postgres.js";

export const getFollowerByIds = (followerId, followedId) => {
  const sql = `--sql
    SELECT
        *
    FROM
        follows f
    WHERE
        f."followerId" = $1
        AND f."followedId" = $2;
    `;
  return connection.query(sql, [followerId, followedId]);
};
