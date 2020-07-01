import { Pool } from 'pg'

//this builds a connection pool (initial expensive setup when server starts)
export const connectionPool:Pool = new Pool({
    host: process.env['LB_HOST'],//the public ip address of sql instance (address of db)
    user: process.env['LB_USER'],//user on database (in this case postgres)
    password: process.env['LB_PASSWORD'],//password
    database: process.env['LB_DATABASE'],//name of database
    port:5432,// the database port (default db port for pg)
    max:5//maximum number of connections
})