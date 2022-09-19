import express from "express";

import {
  postNoticeTotal,
  postPageNotice,
  postFilterNotice,
} from "../controllers/noticeController";
const apiRouter = express.Router();

apiRouter.post("/notice/page", postPageNotice);
apiRouter.post("/notice/count", postNoticeTotal);
apiRouter.post("/notice/rank/filter", postFilterNotice);
export default apiRouter;
