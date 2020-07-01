//index.ts is an entry point 
//like the primary file of a folder. most important file in source, first thing you should run

import express, {Request, Response, NextFunction} from 'express'
import { userRouter } from './routers/user-router'
import { reimbursementRouter } from './routers/reimbursement-router'
import { loggingMiddleware } from './middleware/logging-middleware'
import { sessionMiddleware } from './middleware/session-middleware'
import { BadCredentialsError } from './errors/BadCredentialsError' // if login bad = BadCredentialsError
import { getUsernameAndPassword } from './daos/users-dao'

const app = express() //make an app and call express fcn, express gives us an application

app.use(express.json()) //body parsing middleware turns users input into a js object, can also use fcn express.json()

//recall middleware is a fcn that a request goes through, either moves it closer to endpoint or terminates if cond not met
app.use(loggingMiddleware) //middleware that logs info about requests 
app.use(sessionMiddleware) //order matters so needs to be at beginning of program

app.use('/users', userRouter) //we made a router for the path /users, the router will have all endpoints start with /users

app.use('/reimbursements', reimbursementRouter) //we made a router for the path /reimbursements, recall the router groups endpoints behind single prefix path


//Login Endpoint (make sure its before error handler)
//URL: /login
//Method: Post, since GET has no body it would put password in the url header, so we use POST and can encrypt the body
//An endpoint that unauthenticated users send credentials to receive authentication
app.post('/login', async (req:Request, res:Response, next:NextFunction)=>{
    let username = req.body.username //get data from the body with req
    let password = req.body.password

    if(!username || !password){ //no falsey values can  be string for username
        throw new BadCredentialsError()
    } else {
        try{
            let user = await getUsernameAndPassword(username, password)
            req.session.user = user
            res.json(user)
        } catch(e) {
            next(e)
        }
    }
})

//Error: Something went wrong!
// any errors thrown in our main fcn come through this
app.use((err, req, res, next)=>{
    if (err.statusCode) { //if theres a status code it was one of the errors we specified, send msg
      res.status(err.statusCode).send(err.message)
    } else {
      console.log(err) 
      res.status(500).send("Something went wrong") //if no status code, it means it was something we werent expecting
    }
  })


/*
Examples:
app.get('/Reimbursements',(req:Request, res:Response)=>{
    res.json(reimbursements)
})

app.post('/Reimbursements', (req:Request, res:Response)=>{
    req.body //this body is where the db is
})
*/


//run a listen on our port, 2006
app.listen(2006, ()=>{
    console.log('Welcome! Server has started');
}) 

