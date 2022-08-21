import User from "../models/User";
import bcrypt from "bcrypt";
export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const {
    body: { username, email, password, password1 },
  } = req;
  if (password !== password1) {
    return res.redirect("/");
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.redirect("/");
  }
  await User.create({
    username,
    email,
    password,
  });
  return res.redirect("/login");
};

export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const user = await User.findOne({ username });
  if (!user) {
    return res.redirect("/join");
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.redirect("/join");
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
