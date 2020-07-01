import { HttpError } from './HttpError'

export class UserInputError extends HttpError{
    constructor(){
        super(400, 'Please Fill Out All User Fields')
    }
}