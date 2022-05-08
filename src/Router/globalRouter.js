import express from "express";
import { home, search } from "../controllers/noticeController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/search", search);

export default globalRouter;
