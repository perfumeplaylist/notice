export const globalMiddleware = (req, res, next) => {
  res.locals.siteName = "Notice";
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.user = req.session.user;
  next();
};
