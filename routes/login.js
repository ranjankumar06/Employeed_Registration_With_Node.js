const express = require('express');
const knex = require('../database/db')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')

router.get('/login',(req,res)=>{
    if(req.body.email ===undefined || req.body.password === undefined){
        console.log({"suggestion":"email and password both are needed"})
    }else
    knex.select('*').from('dark').where('email',req.body.email).then((data)=>{
        if(data.length > 0){
            const mack=bcrypt.compareSync(req.body.password,data[0].password)
            if(mack){
                const token= jwt.sign({email:req.body.email},"qwertyuiopasdfghjkl")
                res.cookie("key",token);


                console.log({"login success":data,token});
                res.send({"login success":data,});
            }else{res.send({"error":"Password is invalid"});}
        }else{res.send({"Error":"This user doesn't exit...."})}
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/getall',(req,res)=>{
    knex.select('*').from('dark')
    .then((data) => {
        console.log(data);
        res.send(data)
    }).catch((err)=>{
        console.log('something went wrong',err)
        res.send('something went wrong')
    })
})

router.get('/get/:id',(req, res)=>{
    knex.select("*")
    .from("dark")
    .where("employeed_id",req.params.id)
    .then((data) => {
        console.log({"userdata":data})
        res.send({"userdata":data})
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})


router.put('/update/:id',(req, res)=>{
    knex('dark')
    .where('employeed_id',req.params.id)
    .update(req.body)
    .then((data) => {
        console.log({"userdata":data})
        res.send({"userdata":data})
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

router.delete('/delete/:id',(req, res)=>{
    knex('dark')
    .where('employeed_id',req.params.id)
    .del()
    .then((data) => {
        console.log({"userdata":data})
        res.send({"userdata":data})
    }).catch((err)=>{
        res.send(err)
        console.log(err)
    })
})


router.get('/search', (req, res)=>{
    const search= req.query.search;
    knex.select('firstname','lastname','employeed_id').from('dark')
    .where("employeed_id",'like',`%${search}%`)
    .orWhere("lastname",'like',`%${search}%`)
    .orWhere("firstname","like",`%${search}%`)
    .then((data) => {
        console.log(data)
        res.send(data)
    }).catch((err)=>{
        console.log("something went wrong",err)
        res.send('something went wrong')
    })
})




module.exports= router;