import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authService(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const dateObject = new Date();
  
    const authHeaders = req.headers["authorization"];
  
    if (!authHeaders) {
      return res.status(422).json({
        statusCode: 422,
        message: "authorization token expected",
        timestamp: dateObject.getTime(),
      });
    }
  
    const token = authHeaders.split(" ")[1];
  
    if (!token) {
      return res.status(201).json({
        statusCode: 201,
        message: "Not authorized",
        timestamp: dateObject.getTime(),
      });
    }
  
    try {
      const secret = process.env.SECRET ?? "";
  
      jwt.verify(token, secret);
  
      next();
    } catch (error) {
      console.log(error);
  
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid token",
        timestamp: dateObject.getTime(),
      });
    }
  }