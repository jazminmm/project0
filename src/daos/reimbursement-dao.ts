import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { ReimbursementDTOtoReimbursementConverter } from "../utilities/ReimbursementDTO-to-Reimbursement-converter";

//get all reimbursements from db
//example of abstraction, since we just call getallReimbursements instead of all this code
export async function getAllReimbursements() {
    let client: PoolClient; //"connection" borrow from pool
    try {
        client = await connectionPool.connect()
        let results:QueryResult = await client.query(`select * from project0.reimbursements r 
                                                        left join  project0.users u on r.author = u.user_id
                                                        left join project0.reimbursement_status rs on r.status = rs.status_id 
                                                        left join project0.reimbursement_type rt on r."type" = rt.type_id
                                                        order by r.dateSubmitted;`) 
        
        return results.rows.map(ReimbursementDTOtoReimbursementConverter) //returns arr or throw err, getAll has return value of promise (async)
    } catch(e){
        console.log(e); //tell us what we did wrong, throw error when we havent processed yet (no code yet)
        throw new Error('Unimplemented error')
    } finally {
        client && client.release() //we return the connection to pool after being done 'make sure client is not undef & then release'

    }
}