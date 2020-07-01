//ReimbursementStatus model is used to track the status of reimbursements

//import { Reimbursement } from "./Reimbursement"; //i dont know where I put this

export class ReimbursementStatus{
    statusId: number, // primary key
    status: string // not null, unique
  }