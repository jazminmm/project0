import express, { Request, Response, NextFunction } from 'express'
import { authenticationMiddleware } from '../middleware/authentication-middleware'
import { authorizationMiddleware } from '../middleware/authorization-middleware'
//import { User } from '../models/User'


export const userRouter = express.Router()

userRouter.use(authenticationMiddleware); //this authenticates user login

//Find Users: verify finance-managers, get all users
//URL: /users
//Method: Get 
//Allowed roles: finance-manager

userRouter.get('/', authorizationMiddleware(['Finance-manager']), async (req: Request, res: Response, next: NextFunction) => {
    //if we get it successfully, we want to return it using res.json
    //if we get an error we want to pass that error to the error handler with next(err)
    // interacting with the database is asynchronous, which means the getAllUser function returns a promise
    try {
        //lets try not being async and see what happens
        let allUsers = await getAllUsers()//this is an example of abstraction
        res.json(allUsers)
    } catch (e) {
        next(e) //allows it to move forward
    }
})

//Find Users by id: verify finance-managers, get users by id
//URL: /users/:id
//Method: Get 
//Allowed roles: finance-manager, OR current user id
//TODO: current user id conditional 

//this is an endpoint for retrieving a user by its ID value
userRouter.get('/:id', authorizationMiddleware(['Finance-manager','user']), async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params 
    if (isNaN(+id)) {
        // send a response telling the user that ID need to give us a number
        res.status(400).send('ID needs to be a number')
    /*
    } else if (!== +id){ //if the id is not equal to id 
        resolveTxt.status(400).send('You do not have permission to view this') //if ID does not match & you are not a finance manager !!
    */

    } else {
        try {
            let user = await getUserById(+id)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
})