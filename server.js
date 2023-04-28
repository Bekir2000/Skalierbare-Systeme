var cookieParser = require("cookie-parser");
var express = require("express");
var path = require("path");

var app = express();


const PORT = 8002;

let db = [   
    {
        description:"Beispielseite mit dem Bootstrap Framework anlegen",
        deadline:"03/05/2023",
        percentage:20

    },
    {
        description:"Irgendwas machen",
        deadline:"04/03/2022",
        percentage:50

    }
]
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post("/newtodo.html",(req,res)=>{
    
    console.log("new todo")
    console.log(req.body)
    var task = req.body;

    if(task.description && task.deadline && task.percentage){
        db.push(task)
    }
    
})

app.get("/getTasks",(req,res)=>{
    
    
    res.status(200).json(db)
})




app.use("/",express.static("public"))


app.listen(PORT, ()=> console.log(`listen on http://localhost:${PORT}`))