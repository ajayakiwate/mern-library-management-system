const express = require('express');
const router = express.Router();
const User = require('../models/User');
const IssuedBook = require('../models/IssuedBook');
const Book = require('../models/Book');

const MAX_BOOK_ISSUE_LIMIT = 6
const FINE_AFTER_DAYS = 30
const FINE_PER_DAY = 5

//works fine for frontend
//Get all users
router.get('/', async(req,res)=>{
    try{
        const users = await User.find().populate('books')
       // res.json(issuedbooks1);
        res.json(users)
    }catch(err){
        res.json({message: err, message1: 'Error'});
    }
})

//works fine for frontend
//Get books issued to specific user 
router.get('/:usn', async(req,res)=>{
    try{
        const usn = req.params.usn;
        const users = await User.findOne({usn:usn.toUpperCase()}).populate('books')
       // res.json(issuedbooks1);
      
       var tbook = JSON.parse(JSON.stringify(users.books))
       for(var v in tbook){
          var tb = await Book.findById(tbook[v].bookid)
            tbook[v].bookid = tb.bookname;
       }
        res.json({success:true, books:tbook})
    }catch(err){
        res.json({success:false,message: err, message1: 'Error'});
    }
})

//works fine for frontend
//Authenticate specific user 
router.post('/authenticate', async(req,res)=>{
    try{
        const user = await User.findOne({usn:req.body.usn.toUpperCase(), password: req.body.password})
        if(user!=null){
            if(user.admin){
                res.json({userType:"admin", token1:"addStrongPasswordHere",token2:user.usn, message1:"User is Validated Successfully"})
           
            }
            else{
                res.json({userType:"nonadmin", token1:"justauser",token2:user.usn,message1:"User is Validated Successfully"})
            }
        }
        else{
            res.json({userType:"invalid", message1:"Invalid Username or password"})
        }
    }catch(err){
        res.json({message: err, message1: 'Error'});
    }
})

//works fine for frontend
//Validating for admin or valid or invalid  user 
router.post('/validate', async(req,res)=>{
    try{
        const user = await User.findOne({usn:req.body.usn})
        if(user!=null){
            if(user.admin && String(req.body.usertype) == "addStrongPasswordHere"){
                res.json({userType:"admin"})
            }
            else if(String(req.body.usertype) == "justauser"){
                res.json({userType:"nonadmin"})
            }
        }
        else{
            res.json({userType:"invalid", message1:"Invalid Username or password"})
        }
    }catch(err){
        res.json({message: err, message1: 'Error'});
    }
})

//works fine for frontend
//change password of  specific user 
router.post('/changepassword', async(req,res)=>{
    try{
        const user = await User.findOne({usn:req.body.usn, password: req.body.oldPassword})
        if(user!=null){
            await User.findOneAndUpdate({usn: req.body.usn},{password: req.body.newPassword})
            res.json({success: true, message1:"Password Updated successfully"})
        }
        else{
            res.json({success: false, message1:"Invalid Username or password"})
        }
    }catch(err){
        res.json({message: err, message1: 'Error'});
    }
})

//works fine for frontend
//Get books issued to specific user 
/*
router.get('/:usn', async(req,res)=>{
    try{
        const users = await User.findOne({usn:req.params.usn}).populate('books')
       // res.json(issuedbooks1);
        res.json(users.books)
    }catch(err){
        res.json({message: err, message1: 'Error'});
    }
})
*/


//works fine for frontend
//create a user
router.post('/create',async(req,res)=>{
    const data= req.body;
  
        const user = new User({
            usn: data.usn.toUpperCase(),
            emailid: data.emailid.toLowerCase(),
            fullname: data.fullname,
            mobileno: data.mobileno,
            admin: data.admin,
        });

        try{
            const newuser= await user.save();
            res.json({message: newuser, message1:"User created Sussessfully"});
        }catch(err){
            res.json({message: err, message1: "Error: USN or Email or Mobile No is already taken"});
        }
});

//works fine for frontend
//UPDATE A SPECIFIC user details
router.patch('/:userId',async (req,res)=>{
    //console.log(req.body, req.params);
    
    try{
        const data= req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId, 
            {$set: {usn: data.usn.toUpperCase(),
                emailid: data.emailid.toLowerCase(),
                fullname: data.fullname,
                mobileno: data.mobileno,
                admin: data.admin,
               }}, 
            {new: true, runValidators: true,}
        );
        res.json({message: updatedUser, message1:"User Updated Sussessfully"});
    }catch(err){
        res.json({message: err, message1: "Error: USN or Email or Mobile No is already taken"});
    } 
});

//works fine for frontend
//DELETE A SPECIFIC User
router.delete('/:userId', async(req, res)=>{
    try{
        const user1 = await User.findById(req.params.userId).populate('books')
        const n_books_issued = Object.values(user1.books).filter(element => element.received === false).length

        if(n_books_issued == 0){
            const deletedUser = await User.deleteOne({_id: req.params.userId});
            res.json({message: deletedUser, message1: 'User Deleted Successfully'});
        }
        else{
            res.json({message: "Error: Cannot Delete", message1: 'Error: Collect all issued books from user to Delete'});
        }
    }catch(err){
        res.json({message: err, message1:'Error: User Cannot Be deleted'});
    }
})



//works fine for frontend
//assign book to user input book.isbn and user.usn

router.post('/issuebook', async(req, res)=>{
    
    const data= req.body;
    let t1book, t1user;

    try{
        t1book= await Book.findOne({isbn: data.isbn})
    }catch(err){
        res.json({message: err, message1: 'Error: ISBN Not Found'});
    }

    try{
        t1user= await User.findOne({usn: data.usn.toUpperCase()})
    }catch(err){
        res.json({message: err, message1: 'Error: USN Not found'});
    }

    try{

        const user1 = await User.findById(t1user._id).populate('books')
        const n_books_issued = Object.values(user1.books).filter(element => element.received === false).length
        const n_books_returned =Object.values(user1.books).filter(element => element.received === true).length 
        const already_issued =Object.values(user1.books).filter(element => element.received === false && String(element.bookid) == String(t1book._id)).length

        //res.json({user1: user1, n_books_issued: n_books_issued, n_books_returned: n_books_returned, already_issued: already_issued })
        
        if(already_issued == 0){
            if(t1book.stock > 0){
                if(n_books_issued < MAX_BOOK_ISSUE_LIMIT)
                {
                    const tbook = await Book.findOne({isbn: data.isbn})
    
                    const issuedbook = new IssuedBook({
                        bookid : tbook._id
                    });
            
                    const bookissued= await issuedbook.save();
            
                    const user = await User.findOneAndUpdate({usn:data.usn.toUpperCase()},{
                        $push:{ books: bookissued._id}
                    },
                    {
                        new: true, useFindAndModify: false
                    });
            
                    await Book.findOneAndUpdate({isbn: data.isbn},{stock: tbook.stock - 1})
                   
                    //res.json({message: bookissued, message1: 'Book Issued successfully'});
    
                    res.json({t1bookid:t1book._id,data1: user1, bookissued: bookissued, data2: { already_issued:already_issued ,issued: n_books_issued+1, returned: n_books_returned}, message1: 'Successfully issued the book'});
                }
                else{
                    res.json({message1: "Error: Cannot Issue More then "+MAX_BOOK_ISSUE_LIMIT+" books"})
                }
            }
            else{
                    res.json({message1: "Error: The Book is not in stock"})
            } 
        }else{
            res.json({message1: "Error: you have been already issued the similar copy"})
        }
        
    }catch(err){
        res.json({message: err, message1: 'Error'+ data.isbn});
    }
});


//works fine
//collect book input is ibid -> issuebook._id
router.post('/collectbook', async(req,res)=>{
    const data= req.body;
    let tissuedbook, uissuedbook, tbook, ubook; 
    
    try{
        tissuedbook= await IssuedBook.findOne({_id: data.ibid, received: false})
        if(tissuedbook == null){
            res.json({message1: 'Error: This book is already collected'})
        }
        else{

            uissuedbook = await IssuedBook.findByIdAndUpdate(tissuedbook._id, {received: true, submitdate: Date.now()})
            if(uissuedbook != null){
                try{
                    tbook= await Book.findOne({_id: tissuedbook.bookid})
                }catch(err){
                    res.json({message: err, message1: 'Error: Book Not Found'});
                }
            }

            if(tbook != null){
                ubook = await Book.findByIdAndUpdate(tbook._id,{stock: tbook.stock + 1})
            }

            //find the user for which issuedbook._id(data.ibid) is assigned
            const users = await User.find().populate('books')
            var user_id;
            for(var i in users){    
                for(var j in users[i].books){
                    if(String(users[i].books[j]._id) == String(data.ibid)){
                        user_id=users[i]._id 
                    }
                } 
            }

            //calculating fine
            const bookissued1 = await IssuedBook.findById(data.ibid);
            const no_of_days_bookissued = Math.floor(Math.abs(((bookissued1.submitdate - bookissued1.issuedate)/(1000*24*60*60))))
            let fineAmount = 0
            let delayDays = 0
            if(no_of_days_bookissued > FINE_AFTER_DAYS){
                delayDays = no_of_days_bookissued - FINE_AFTER_DAYS
                fineAmount = (delayDays) * FINE_PER_DAY //5 units of fine per day
                await User.findOneAndUpdate({_id:user_id},{$inc : {'fine' : fineAmount}}, {new: true})
            }

            //update user with fine amount if any


            res.json({message1: "Successfully collected the book, with fine : "+fineAmount+" units for delaying : "+delayDays+" days"})
        }
    }catch(err){
        res.json({message: err, message1: 'Error: IssuedBook Not Found'});
    }
})


module.exports = router;