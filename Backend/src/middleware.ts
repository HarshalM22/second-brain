
import  jwt  from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";


export function auth(req : Request, res:Response, next:NextFunction) {
  const {token} = req.headers;
  
  const tokenInfo = jwt.verify(token as string , JWT_SECRET);
  const jwtPayload = tokenInfo as JwtPayload;
  if (jwtPayload.userId) {
    req.body.userId = jwtPayload.userId;
    next();
  } else {
    res.json({
      MESSAGE: "YOU ARE NOT LOGGED IN ",
    });
  }
}