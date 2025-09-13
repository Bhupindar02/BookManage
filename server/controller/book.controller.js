const { Book } = require("../model/book.model");
const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;
    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice ||
      !body.PublishDate
    ) {
      return res
        .status(400)
        .json({ Message: "All field are required", Success: false });
    }
    const bookAdd = await Book.create(body);

    if (bookAdd) {
      return res
        .status(201)
        .json({
          Message: "Data created successfully !",
          Success: true,
          Id: bookAdd?._id,
        });
    }

    console.log("bookadded", bookAdd);
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};
const handleBookListsController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res
      .status(200)
      .json({
        Message: "All books fetch Successfully",
        Success: true,
        TotalCount: bookList.length,
        BookList: bookList,
      });
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};
const handleBookDeleteController=async(req,res)=>{
const body = req.body
  try {
    const deleted = await Book.deleteOne({_id:body.Id})
    console.log('deleted',deleted)
    if(deleted.acknowledged){
      return res.json({
        Message:"Book deleted successfully !",
        Success:true,
      })
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });

  }
}

const handleBookUpdateController=async(req,res)=>{
  const body = req.body
  try {
    const updating = await Book.updateOne({_id:body?.Id},{$set:body})
    console.log("updating",updating)
    if(updating?.acknowledged){
      return res.json({
        Message:"Book updated sucessfully !",
        Success:true
      })
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
}
module.exports = { handleBookStoreController,handleBookListsController,handleBookDeleteController,handleBookUpdateController };
