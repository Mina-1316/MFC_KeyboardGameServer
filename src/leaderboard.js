const express = require('express');

const app = express();
const port = 8091;

const maxLeaderboardNumber = 10;

var scoreArray = [
    {
        "name" : "",
        "score" : "0"
    }
]

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('json spaces', 2);

app.post('/test',(req,res)=>{
    console.log("connection from : " + req.connection.remoteAddress);

    res.send("server test.");
});

app.post('/addscore',(req,res)=>{
    //send message form
    var resMessage = {
        "message" : ""
    }

    try{
        //prints the client's IP
        console.log("connection from : " + req.connection.remoteAddress + "by /addscore");

        //check body elements
        if(req.body.name==undefined || req.body.score==undefined){
            resMessage.message = "Invalid Header Elements";
        }else{
            scoreArray.push({"name":req.body.name,"score":req.body.score});
            scoreArray.sort((a,b)=>{
                //정렬 조건 지정
                if (parseInt(a.score) > parseInt(b.score)) {return -1;}
                if (parseInt(a.score) < parseInt(b.score)) {return 1;}
                return 0;});

            scoreArray = scoreArray.slice(0,maxLeaderboardNumber);
            resMessage.message = "Succesfully uploaded";
        }
    }catch{
        resMessage.message = "An unexpected Error has occured, please contact to admin";
    }
    res.send(resMessage);

    console.log("send response : " + resMessage.message);
});

app.post('/getscore',(req,res)=>{
    try{
        //prints the client's IP
        console.log("connection from : " + req.connection.remoteAddress + "by /getscore");

        res.send(scoreArray);
        console.log("send response : leaderboard");
    }catch{
        console.log("an Error has occured");
    }
});

app.post('/resetscore',(req,res)=>{
    reset();
    try{
        //prints the client's IP
        console.log("connection from : " + req.connection.remoteAddress + "by /resetscore");

        res.send("succesfully resetted");
        console.log("send response : leaderboard");
    }catch{
        console.log("an Error has occured");
    }
});

function reset(){
    scoreArray = [
        {
            "name" : "",
            "score" : "0"
        }
    ];
    for(var i=0;i<maxLeaderboardNumber-1;i++){
        scoreArray.push({"name" : "", "score" : "0"})
    }
}

app.listen(port, ()=>{
    reset();
    console.log("Server is started at port "+ port);
});


