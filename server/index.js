const express = require("express");
const databaseConnection = require("./database")
const bookRouter = require("./routes/book.routes")
require("dotenv").config();
var cors = require('cors')
//database connection
databaseConnection();
//config app
const app = express();
const port = process.env.PORT||8000;
app.use(express.json());//middleware-prase
app.use(cors())
app.get("/",(req,res)=>{
  res.send("Hello World,How are you ?");
})
app.use("/book",bookRouter)
app.listen(port,()=>{
    console.log(`Port listning on ${port}`)
})