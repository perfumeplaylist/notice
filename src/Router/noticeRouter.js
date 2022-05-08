import express from "express";
import {
  getUpload,
  postUpload,
  see,
  getEdit,
  postEdit,
  deleteNotice,
} from "../controllers/noticeController";
const noticeRouter = express.Router();

noticeRouter.route("/upload").get(getUpload).post(postUpload);
noticeRouter.get("/:id([\\d])", see);
noticeRouter.route("/:id([\\d])/edit").get(getEdit).post(postEdit);
noticeRouter.get("/:id([\\d])/delete", deleteNotice);
export default noticeRouter;
