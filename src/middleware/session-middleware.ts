//Note: Alec said to just trust him
import session, { SessionOptions } from 'express-session'

//config obj
const sessionConfig:SessionOptions = {
    secret: 'secret', //will need to be updated w/p
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}

//this is a fcn factory, it calls session with session config
export const sessionMiddleware = session(sessionConfig)