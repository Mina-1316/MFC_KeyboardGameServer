const express = require('express');

const app = express();
const port = 8091;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('json spaces', 2);

app.get('/test',(req,res)=>{
    res.send("server test.");
})

app.listen(port, ()=>{
    console.log("Server is started at port "+ port);
});