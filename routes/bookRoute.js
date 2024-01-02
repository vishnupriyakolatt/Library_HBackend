const express=require('express')
const bookRoute=express.Router()
const upload = require('../utility/multer');
const{viewbook,singlebook,viewTransaction,AdminviewTransaction,AddBook,deleteBook,addcategory,deletecategory,viewcategory,searchBook,addTransaction}=require('../controllers/bookController')
const verifyToken=require('../middleware/verifyToken')

bookRoute.get('/findbook/:id',verifyToken,singlebook)
bookRoute.post('/addbook',upload.single('file'),verifyToken,AddBook)
bookRoute.get('/viewbook',verifyToken,viewbook)
bookRoute.delete('/delete/:id',verifyToken,deleteBook);

bookRoute.post('/search', verifyToken,searchBook);
bookRoute.get('/singlebook/:name', verifyToken, singlebook);


bookRoute.post('/addcategory', upload.single('file'),verifyToken, addcategory);
bookRoute.get('/viewCategory',verifyToken,viewcategory)
bookRoute.delete('/deletecategory/:id',verifyToken,deletecategory)

bookRoute.post('/transaction',verifyToken,addTransaction);
bookRoute.get('/viewtransaction',verifyToken,viewTransaction);

bookRoute.get('/AdminviewTransaction',verifyToken,AdminviewTransaction)


module.exports = bookRoute;