import { Router } from "express";
import {
  getPostsByHashtag,
  getTopHashtags,
} from "../controllers/hashtagController.js";
const hashtagRouter = Router();

hashtagRouter.get("/hashtags", getTopHashtags);
hashtagRouter.get("/hashtag/:hashtag", getPostsByHashtag);

export default hashtagRouter;
