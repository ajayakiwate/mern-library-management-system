const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const IssuedBook = require('../models/IssuedBook');
const User = require('../models/User');

//works fine for frontend
//GET BACK ALL THE BOOKS
router.get('/',async(req,res)=>{
    try{
        const books = await Book.find();
        res.json(books);
    }catch(err){
        res.json({message: err});
    }
});

//works fine for frontend
//GET A SPECIFIC Book Detail
router.get('/:bookId', async(req, res)=>{
    try{
      
        const book = await Book.findById(req.params.bookId);
        res.json(book);
       
    }catch(err){
        res.json({message: err});
    }
});

//works fine for Testing Only
//GET user._id for specific trid
router.get('/bookissue/:TRID', async(req, res)=>{
    try{
        const users = await User.find().populate('books')
        var the_user;
        for(var i in users){    
            for(var j in users[i].books){
                if(String(users[i].books[j]._id) == String(req.params.TRID)){
                    the_user=users[i]
                }
            }
        }
        /*
        for(var user in users){
            for(var book in user.books){
                if(String(book._id) == String(req.params.TRID)){//book.received == true && 
                    filtered.push(user);
                }
            }
        }
        */
        res.json(the_user)
        /*
        //const already_issued = Object.values(users).filter(element => element.books.received === true && String(element.books._id) == String(req.params.TRID))
        const already_issued = Object.values(users).filter(element => {
            Object.values(element.books).filter(element1 =>{
                element1.received === true && String(element1._id) == String(req.params.TRID)
            })
        })
        */
        
        
        /*
        const bookissued = await IssuedBook.findById(req.params.TRID);
        res.json(Math.floor((bookissued.submitdate - bookissued.issuedate)/(1000*24*60*60)));
       */
    }catch(err){
        res.json({message: err});
    }
});

//works fine for frontend
//Create a New Book
router.post('/', async(req, res)=>{
    const data= req.body;
    const book = new Book({
        bookname: data.bookname,
        author: data.author,
        publisher: data.publisher,
        isbn: data.isbn,
        total: data.total,
        stock: data.total
    });

    try{
        const savedBook= await book.save();
        res.json({message: savedBook, message1: 'Book Created successfully'});
    }catch(err){
        res.json({message: err, message1: 'Book already exists with isbn:'+ data.isbn});
    }
});

//works fine for frontend
//DELETE A SPECIFIC book
router.delete('/:bookId', async(req, res)=>{
    try{
        const book = await Book.findById(req.params.bookId);
        if(book.total == book.stock){
            const deletedBook = await Book.deleteOne({_id: req.params.bookId});
        res.json({message: deletedBook, message1: "Book Deleted Successfully"});
        }
        else{
            res.json({message1:"Error: Some books are issued, collect those books!"})
        }
    }catch(err){
        res.json({message: err, message1: "Error: Cannot Delete the Book"});
    }
})

//works fine for frontend
//UPDATE A SPECIFIC book details
router.patch('/:bookId',async (req,res)=>{
    //console.log(req.body, req.params);
    
    try{
        const data= req.body;
        const book = await Book.findById(req.params.bookId);
        if(req.body.total >= (book.total - book.stock) ){
            const tstock = (req.body.total - book.total) + book.stock;
            const ttotal = req.body.total;

            const updatedBook = await Book.findByIdAndUpdate(
                req.params.bookId, 
                {$set: {bookname: data.bookname,
                    author: data.author,
                    publisher: data.publisher,
                    isbn: data.isbn,
                    total: ttotal,
                    stock: tstock,
                }}, 
                {new: true, runValidators: true,}
            );
            res.json({message: updatedBook, message1: "Data successfully Updated"});
        }
        else{
            res.json({message1: "Error: Total books should be greater than or equal to issued books"})
        }
        
    }catch(err){
       res.json({message: err, message1:"Error: ISBN should be unique"});
    } 
});


module.exports = router;