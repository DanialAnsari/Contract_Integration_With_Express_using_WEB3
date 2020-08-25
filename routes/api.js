
let express = require('express'),
    router = express.Router(),
    constants = require('../utils/constants');
    functions=require('../utils/functions');
    const CircularJSON = require('circular-json');
    const stringify = require('json-stringify-safe')


    router.post('/approve',async(req,res)=>{
        try{
            const result=await functions.approve(req.body.spender,req.body.tokens);
            res.status(201).send("allowance set successfully");
        }catch(e){
            console.log(e);
            res.send('something went wrong ...')
        }
    })

    router.post('/transfer',async(req,res)=>{
        try{
            const result=await functions.transfer(req.body.to,req.body.tokens);
            res.status(201).send("allowance set successfully");
        }catch(e){
            console.log(e);
            res.send('something went wrong ...')
        }
    })

    router.post('/transferFrom',async(req,res)=>{
        try{
            const result=await functions.transferFrom(req.body.from,req.body.to,req.body.tokens);
            res.status(201).send("allowance set successfully");
        }catch(e){
            console.log(e);
            res.send('something went wrong ...')
        }
    })

    router.get('/balanceOf/:address',async(req,res)=>{
        try{
           const _address= req.params.address;
           console.log(_address)
           const result = await functions.balanceOf(_address);
           
           res.send(result)
        }catch(e){
            console.log(e);
            res.send('something went wrong ...')
        }
    })

    router.get('/allowance/:address',async(req,res)=>{
        try{
           const _address= req.params.address;
           const result = await functions.allowance(_address);
           res.send(result);
       console.log(req.params);
        }catch(e){
            console.log(e)
        }
    })

    

    console.log("here")
    module.exports = router