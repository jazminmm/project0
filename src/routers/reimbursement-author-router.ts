/*
Find Reimbursements by User or "authors"
Reimbursements should be ordered by date

URL: /reimbursements/author/userId/:userId
Method: GET
Allowed roles: finance-manager or userId (if user is making request)

Response: [
  Reimbursement
]
*/

import express, { Request, Response, NextFunction } from 'express'
//mport { ReimbursementUserInputError } from "../errors/ReimbursementUserInputError"
import { getAllReimbursements } from 'src/daos/reimbursement-dao'
//import { UserIdInputError } from "../errors/UserIdInputError";?? Why do we need this??
//import { getReimbursementByUser } from '../daos/reimbursements-dao'
//import { authorizationMiddleware } from '../middleware/authorization-middleware'

export let reimbursementRouter = express.Router() //already has path /reimbursementAuthorRouter so we assume every endpoint inside router already get this path

reimbursementRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // .json sends the objects in Json notation
    try {
        let reimbursements = await getAllReimbursements()
        res.json(books)
    } catch (e) {
        next(e)
    }

})