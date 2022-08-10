import { Router } from "express";
import {
  createdPost,
  getPosts,
  openUrlPost,
} from "../controllers/PostController";

const postRouter = Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", openUrlPost);
postRouter.post("/posts", createdPost);
