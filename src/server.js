import "dotenv/config";
import "./db";
import "./models/notice";
import "./models/User";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import { globalMiddleware } from "./middleware";
import globalRouter from "./Router/globalRouter";
import noticeRouter from "./Router/noticeRouter";
import userRouter from "./Router/userRouter";
import apiRouter from "./Router/apiRotuer";
const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use(
  session({
    secret: process.env.COOKIE_ID,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use("/static", express.static("asset"));
app.use("/uploads", express.static("uploads"));
app.use(globalMiddleware);
app.use("/", globalRouter);
app.use("/notice", noticeRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);
const handleListen = () => console.log(`http://localhost:${PORT}`);
app.listen(PORT, handleListen);
