const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
require("dotenv").config();
const cors = require("cors")


//database connection
databaseConnection();
//config app
const app = express();
const port = process.env.PORT||8000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send('manage boos server!!')
})

app.use('/book',bookRouter)
app.listen(port,()=>{
  console.log( 'port listning on 8000')
})
