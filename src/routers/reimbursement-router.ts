import express, { Request, Response, NextFunction } from 'express'
import { ReimbursementUserInputError } from "../errors/ReimbursementUserInputError"
import { ReimbursementIdInputError } from "../errors/ReimbursementIdInputError"
import { Reimbursement } from "../models/Reimbursement"
import { authorizationMiddleware } from "../middleware/authorization-middleware"

import { getAllReimbursements } from 'src/daos/reimbursement-dao'

export let reimbursementRouter = express.Router()

reimbursementRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let reimbursements = await getAllReimbursements()
        res.json(reimbursements)
    } catch (e) {
        next(e)
    }

})

//saves a new reimbursement
//this endpoint runs middlware
//authorizes them to do this
reimbursementRouter.post('/', authorizationMiddleware(['admin','finance-manager','user']), async (req:Request, res:Response, next:NextFunction) => {
    console.log(req.body);
    let {author,
        amount,
        dateSubmitted,
        dateResolved,
        description,
        resolver,
        status,
        type} = req.body; // destructuring example

        if (author && amount && dateSubmitted && dateResolved && description && resolver && status && type && (!series && typeof (series) === 'boolean' || series) && numberInSeries) {
        //books.push({ bookId, genre, authors, publisher, publishingDate, pages, chapters, title, series, numberInSeries, ISBN })
    
        res.sendStatus(201)//sends an empty response with the status code 201
    } else {
        // .status sets the status code but deson't send res
        // .send can send a response in many different content-types
        throw new ReimbursementUserInputError()
    }
})


