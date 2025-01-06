
import  jwt  from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = "harshal";
// @ts-ignore
export function auth(req, res, next) {
  const token = req.headers.token;

  const tokenInfo = jwt.verify(token, JWT_SECRET);
  const jwtPayload = tokenInfo as JwtPayload;
  if (jwtPayload.userId) {
    req.body.userId = jwtPayload.userId;
    next();
  } else {
    res.json({
      MESSAGE: "YOU ARE LOGGED IN ",
    });
  }
}