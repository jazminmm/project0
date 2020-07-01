import { Request, Response, NextFunction } from "express";

//when someone sends us a request, we want to log where it is from and what kind of request was sent
//if we collect this data, we can optimize some things (like server location if requests from specific regions)
export function loggingMiddleware(req:Request,res:Response,next:NextFunction){
    console.log(`${req.method} Request from ${req.ip} to ${req.path} `)
    next()// tells express this function is done, and move to the next matching piece of middleware
}