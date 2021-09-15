require('dotenv').config(`${__dirname}/.env`)
const knex=require('knex')({ 
    client:"mysql",
    connection:{
        password:process.env.PASSWORD,
        host: process.env.HOST,
        user: process.env.USER_N,
        database:process.env.DB
    }
})

knex.schema.createTable('dark',(Table)=>{
    Table.increments('employeed_id').primary()
    Table.string('lastname')
    Table.string('firstname')
    Table.string('email')
    Table.string('password')
    Table.string('organization')
}).then((data)=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("already exists")
})


module.exports=knex;




