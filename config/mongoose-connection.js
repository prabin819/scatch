const mongoose = require('mongoose');

const config = require('config');   
                                                            
const dbgr = require('debug')('development:mongoose');        //to set env var     //set DEBUG=development:*
                                                               //to remove env var  //set DEBUG=
                                                               //for windows set and for mac export


mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)                 //$env:DEBUG="development:*"   //$env:DEBUG="development:mongoose"
.then( function(){                                              //$env:NODE_ENV="development"  //set permanentsetx NODE_ENV development
    dbgr("mongodb connected.");
})
.catch( function(err){
    dbgr(err);
})

module.exports = mongoose.connection;