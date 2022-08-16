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

export const insertFollow = (followerId, followedId) => {
  const sql = `--sql
    INSERT INTO
        follows ("followerId", "followedId")
    VALUES
        ($1, $2);
    `;
  return connection.query(sql, [followerId, followedId]);
};

export const deleteFollow = (followerId, followedId) => {
  const sql = `--sql
    DELETE FROM
        follows
    WHERE
        "followerId" = $1
        AND "followedId" = $2;
    `;
  return connection.query(sql, [followerId, followedId]);
};
