const express=require('express')
const router=require('./routes/api')
const app=express();
const port=process.env.PORT || 3000
app.use(express.json())
app.use(router);
app.listen(port,()=>{
    console.log('Server Running on port ' + port);
})