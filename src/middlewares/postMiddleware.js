export async function checkToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }
    res.locals.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
