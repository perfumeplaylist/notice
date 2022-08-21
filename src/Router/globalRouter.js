import express from "express";
import { home, getSearch, postHome } from "../controllers/noticeController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.get("/search", getSearch);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);

export default globalRouter;
