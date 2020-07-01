import { HttpError } from "./HttpError";

export class ReimbursementUserInputError extends HttpError {
    constructor(){//has no params
        super(400, 'Please Fill Out All Reimbursement Fields')
    }
}