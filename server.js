var cookieParser = require("cookie-parser");
var express = require("express");
var path = require("path");

var app = express();


const PORT = 8004;

let db = [   
    {
        id: 0,
        description:"Beispielseite mit dem Bootstrap Framework anlegen",
        deadline:"03/05/2023",
        percentage:20

    },
    {
        id: 1,
        description:"Irgendwas machen",
        deadline:"04/03/2022",
        percentage:50

    }
]
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post("/newtodo.html",(req,res)=>{
    
    
    let task = req.body;
    console.log('created: ')
    console.log(task)

    if(task.description && task.deadline && task.percentage){

        if(db.length != 0){
            task.id = db.slice(-1)[0].id + 1
        }else{
            task.id = 0
        }

        db.push(task)
    }
    
})

app.get("/getTasks",(req,res)=>{
    
    
    res.status(200).json(db)
})

app.delete("/deleteButton", (req, res)=>{
    

    let task = req.body
    db = db.filter(item => item.id != task.id)

    console.log("deleted: ")
    console.log(task)
    
    res.sendStatus(200)
})




app.use("/",express.static("public"))


app.listen(PORT, ()=> console.log(`listen on http://localhost:${PORT}`))