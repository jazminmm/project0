import { HttpError } from './HttpError'

export class UserIdInputError extends HttpError{
    constructor(){
        super(400, "ID must be a number")
    }
}