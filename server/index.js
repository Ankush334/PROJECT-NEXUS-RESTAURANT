const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const CustomerModel = require('./models/Customer')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/customer")

app.post('/login' , (req , res)=>{
    const {email , password} = req.body;
    CustomerModel.findOne({email : email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("success")
            } else {
                res.json("password is incorrect ")
            }
        }else {
            res.json('No record Existed')
        }
    })
})

app.post('/register' , (req , res)=>{
    CustomerModel.create(req.body)
    .then(customers => res.json(customers))
    .catch(err=>res.json(err))
})


app.listen(3001 , ()=>{
    console.log("server is running")
} )