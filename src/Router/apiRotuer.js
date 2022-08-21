import express from "express";

import {
  postNoticeTotal,
  getPageNotice,
} from "../controllers/noticeController";
const apiRouter = express.Router();

apiRouter.get("/notice/page", getPageNotice);
apiRouter.post("/notice/count", postNoticeTotal);
export default apiRouter;
