//ReimbursementType model is used to track what kind of reimbursement is being submitted
//Type possibilities: Lodging, Travel, Food, Other

export class ReimbursementType {
    typeId: number // primary key
    type: string // not null, unique
}