let notices = [
  {
    id: 1,
    title: "See",
    description: "aksjdbfkajsdnfkjasdnf",
    createAt: new Date(),
    user: "Kim",
    meta: {
      rating: 0,
      view: 0,
    },
  },
  {
    id: 2,
    title: "Check",
    description: "zxcvzxcvasdfigb",
    createAt: new Date(),
    user: "Que",
    meta: {
      rating: 0,
      view: 0,
    },
  },
  {
    id: 3,
    title: "help",
    description: "qowirjfijsabdfjhas",
    createAt: new Date(),
    user: "Stack",
    meta: {
      rating: 0,
      view: 0,
    },
  },
  {
    id: 4,
    title: "See",
    description: "qweoirtjnfsfkjnvoksa",
    createAt: new Date(),
    user: "Jung",
    meta: {
      rating: 0,
      view: 1,
    },
  },
];

// globalRouter
export const home = (req, res) => {
  // 조회수 순으로 정렬
  notices.sort((a, b) => {
    if (a.meta.view > b.meta.view) {
      return -1;
    }

    if (a.meta.view < b.meta.view) {
      return 1;
    }
    return 0;
  });

  return res.render("home", { pageTitle: "Home", notices });
};

export const search = (req, res) => {
  const {
    query: { title },
  } = req;
  //   const notice = notices.find((el) => el.title === title);
  const notice = notices.filter((el) => el.title === title);
  if (notice === undefined) {
    return res.render("search", { pageTitle: "Search Title" });
  }
  return res.render("search", { pageTitle: "Search Title", notice });
};

// noticeRouter
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: `Upload Noitce` });
};

export const postUpload = (req, res) => {
  const {
    body: { title, content },
  } = req;
  if (title && content) {
    const notice = {
      id: notices.length + 1,
      title,
      description: content,
      createAt: new Date(),
      meta: {
        rating: 0,
        view: 0,
      },
    };
    notices.push(notice);
    return res.redirect("/");
  }
};

export const see = (req, res) => {
  const {
    params: { id },
  } = req;
  const notice = notices.find((el) => el.id === Number(id));
  notice.meta.view += 1;
  if (notice) {
    return res.render("see", { pageTitle: `See ${notice.title}`, notice });
  }
  return res.redirect("/");
};

export const getEdit = (req, res) => {
  const {
    params: { id },
  } = req;
  const notice = notices.find((el) => el.id === Number(id));
  if (notice) {
    return res.render("edit", { pageTitle: `Edit ${notice.title}`, notice });
  }
  return res.redirect("/");
};

export const postEdit = (req, res) => {
  const {
    body: { title, content },
    params: { id },
  } = req;
  if (title && content) {
    const notice = notices.find((el) => el.id === Number(id));
    notice.title = title;
    notice.description = content;
    return res.redirect("/");
  }
};

export const deleteNotice = (req, res) => {
  const {
    params: { id },
  } = req;
  if (id) {
    const index = notices.findIndex((el) => el.id === Number(id));
    notices.splice(index, 1);
    return res.redirect("/");
  }
};
// 오류처리
