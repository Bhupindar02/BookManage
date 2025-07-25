const express = require("express");
const{handleBookStoreController,handleBookListsController,handleBookDeleteController,handleBookUpdateController}=require("../controller/book.controller")
const router = express.Router();
router.post("/addbook",handleBookStoreController)
router.get("/booklists",handleBookListsController)
router.post("/deletebook",handleBookDeleteController)
router.put("/updatebook",handleBookUpdateController)

module.exports=router;