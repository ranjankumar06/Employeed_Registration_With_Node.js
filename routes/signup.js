 
const express = require('express');
const knex = require('../database/db')
const app = express()
const route = express.Router()
route.use(express.json())   
const bcrypt = require('bcrypt');

route.post('/sign', (req, res) => {
    var encoded=bcrypt.hashSync(req.body.password,10)
    if(req.body.email===undefined || req.body.password===undefined ){
        console.log({"suggestion":"email and password both are require"})
    }else
    knex.select("*").from('dark').where('email',req.body.email).then((data) => {
        // console.log(data.length<1);
        if (data.length < 1) {
            knex("dark")
                .insert({
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    password:encoded,
                    organization:req.body.organization
                })
                .then((data) => {
                    res.send(data)
                }).catch((err) => {
                    console.log("err");
                    res.send("err")
                })
        }else{

            console.log("already exists");
            res.send("already exists")
        }

    })
})


module.exports = route;