import "./db";
import "./models/notice";
import "./models/User";
import express from "express";
import morgan from "morgan";
import globalRouter from "./Router/globalRouter";
import noticeRouter from "./Router/noticeRouter";
const app = express();
const logger = morgan("dev");
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);

app.use("/", globalRouter);
app.use("/notice", noticeRouter);

const handleListen = () => console.log(`http://localhost:${PORT}`);
app.listen(PORT, handleListen);
