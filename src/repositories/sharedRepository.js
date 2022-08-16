import connection from "../databases/postgres.js";

async function getSharedPostsByUserIdAndPostId(userId, postId) {
	const query = `
		SELECT *
		FROM "sharedPosts"
		WHERE "userId" = $1 AND "postId" = $2
	`;
	return connection.query(query,[userId, postId]);
}

export const sharedRepository = {
	getSharedPostsByUserIdAndPostId
};