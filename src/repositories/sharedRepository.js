import connection from "../databases/postgres.js";

async function getSharedPostsByUserIdAndPostId(userId, postId) {
	const query = `
		SELECT *
		FROM "sharedPosts"
		WHERE "userId" = $1 AND "postId" = $2
	`;
	return await connection.query(query, [userId, postId]);
}

async function getAllSharedPosts() {
	const query = `
		SELECT s.id as id, s."postId", u.id as "userId", u."username"
		FROM "sharedPosts" s
		JOIN users u
		ON u.id = s."userId"
	`;
	return await connection.query(query, []);
}

export const sharedRepository = {
	getSharedPostsByUserIdAndPostId,
	getAllSharedPosts
};