import {sharedRepository} from "../repositories/index.js";

export const checkUserSharedPost = async (req, res, next) => {
	try {
		const { userId } = res.locals;
		const { id: postId } = req.params;
		const {rows: sharedPosts} = await sharedRepository.getSharedPostsByUserIdAndPostId(userId, postId);
		if(sharedPosts.length > 0)
			return res.status(409)
			.send("User alredy shared by this post");
		next();
	} catch (error) {
		res.status(500)
		.send(`Internal system error.\n More details: ${error.message}`);
	}
};