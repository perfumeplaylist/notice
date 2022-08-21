import Notice from "../models/notice";

// globalRouter
export const home = async (req, res) => {
  const notice = await Notice.find().sort({ "meta.views": "desc" });
  return res.render("home", { pageTitle: "Home", notice });
};

export const getSearch = async (req, res) => {
  const {
    query: { title },
  } = req;
  const notice = await Notice.find({
    title: {
      $regex: new RegExp(`^${title}`, "i"),
    },
  });
  return res.render("search", { pageTitle: "Search Title", notice });
};

// noticeRouter
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Noitce` });
};

export const postUpload = async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const { file } = req;
  await Notice.create({
    title,
    image: file.path,
    description: content,
  });
  return res.redirect("/");
};

export const see = async (req, res) => {
  const id = req.params.id;
  try {
    const notice = await Notice.findById(id);
    await Notice.findByIdAndUpdate(id, {
      meta: {
        views: notice.meta.views + 1,
      },
    });
    return res.render("see", { pageTitle: `${notice.title}`, notice });
  } catch (error) {
    console.log(error);
  }
};

export const getEdit = async (req, res) => {
  const id = req.params.id;
  const notice = await Notice.findById(id);
  return res.render("edit", { pageTitle: `Edit : ${notice.title}`, notice });
};

export const postEdit = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.content;
  const exists = await Notice.exists({ _id: id });
  if (!exists) {
    return res.redirect("/");
  }
  await Notice.findByIdAndUpdate(id, {
    title,
    description,
  });
  return res.redirect("/");
};

export const deleteNotice = async (req, res) => {
  const id = req.params.id;
  await Notice.findByIdAndDelete(id);
  return res.redirect("/");
};

export const postNoticeTotal = async (req, res) => {
  const {
    body: { baseCount },
  } = req;
  const notice = await Notice.find({});
  const count = notice.length / baseCount;
  if (!count) {
    return res.sendStatus(404);
  }
  return res.status(301).json(count);
};

export const getPageNotice = async (req, res) => {
  const {
    query: { target, count },
  } = req;
  const notice = await Notice.find().sort({ "meta.views": "desc" });
  const firstScope = Number(target) - 1;
  const endScopre = Number(target) + 1;
  let targetNotice;
  if (target === "1") {
    targetNotice = notice.slice(firstScope, firstScope + count);
  } else {
    targetNotice = notice.slice(endScopre, endScopre + count);
  }
  if (!targetNotice) {
    return res.sendStatus(404);
  }
  return res.status(301).json({ targetNotice });
};
