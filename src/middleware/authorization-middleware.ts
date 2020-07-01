import { Request, Response, NextFunction } from "express";

// using factory pattern, we provide an array of accepted roles & return a fcn that allows those roles through
// this fcn is a middleware factory
export function authorizationMiddleware(roles:string[]){// build a middleware function
    return (req:Request, res:Response, next:NextFunction) => {
        let allowed = false
        for(const role of roles){
            if(req.session.user.role === role){
                //if matching role, allow them in and let them access
                allowed = true
                next()
            }
        }
        if(!allowed){
            // if they didn't have a matching role, do not let them access
            res.status(401).send("The incoming token has expired")
        }
    }

}

//allow admin+manager

//allow only admin

//allow user + manage + admin

//allow user +admin