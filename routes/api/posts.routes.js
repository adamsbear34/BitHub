const express = require('express');
const router = express.Router();
const {check, validationResult, Result} = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Profile = require('../../models/Profile');
const Post = require('../../models/Posts');
const Category = require('../../models/Category');
const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const Posts = require('../../models/Posts');
const fs = require('fs');
const { Promise } = require('mongoose');
const { Buffer } = require('buffer');
const upload = require('../../middleware/file-upload');
const singleUpload = upload.single('image');
const siteViewsUp = require('../../functions/visitUp');



/**
 * Create new post by auth user
 * Add update rating 
 */
router.post('/', 
    auth,
    async (req, res) => {
    try{
        let arrayOfCategories = null;
        const newPost = await new Promise(function (resolve, reject){
            singleUpload(req, res, function(err){
                    if (err){
                        return res.status(400).json({errors: [{message: err.message}]});
                    }
        
                    const {title, body, categories } = req.body;

                    //Valiidation
                    if (!title || !title.length){
                        return res.status(400).json({errors: [{message: 'Title is requred.'}]});
                    }
                    if (!body || body.length < 200){
                        return res.status(400).json({errors: [{message: 'Content should be at least 200 characters.'}]});
                    }
                    if (!categories || categories.length == 0){
                        return res.status(400).json({errors: [{message: 'At least one category is required.'}]});
                    }
                    if (!req.file){
                        return res.status(400).json({errors: [{message: 'Cover image is required.'}]});
                    }
        
        
        
                    const post = new Post();
                    post.title = title;
                    post.body = body;
                    post.slug = slugify(title).toLowerCase();
                    post.excerpt = smartTrim(body, 320, ' ', '...');
                    post.postedBy = req.user.id;
                    post.photo = req.file.location;
                    //Categories
                    arrayOfCategories = categories && categories.split(',');
                    resolve(post);
                });//post parse
            }); //new post

            await newPost.save();
            try{
             const post = await Post.findByIdAndUpdate(newPost._id, {$push: {categories: arrayOfCategories}}, {new: true}).exec();
             const user = await  User.findById(req.user.id);
             user.posts.unshift(post);
             user.rating += 10;
             await user.save();
             res.json(post);
            }catch(err){
                console.error(err.message);
                res.status(400).json({msg: "Somthing went wrong", err: err.message}); 
            }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


/*
* Upadte user posts
*/
router.post('/edit/:id', [
        auth,
        [
            check('title').not().isEmpty().withMessage("Title is required")
        ]
    ], 
    async (req, res) => {

        try{   
            let arrayOfCategories = null;
            let postFields = {};
            const updatedPost = await new Promise(function (resolve, reject){
                singleUpload(req, res, function(err){
                        if (err){
                            return res.status(400).json({errors: [{message: err.message}]});
                        }

                        const {title, body, categories } = req.body;
    
                        //Valiidation
                              //Valiidation
                        if (!title || !title.length){
                            return res.status(400).json({errors: [{message: 'Title is requred.'}]});
                        }
                        if (!body || body.length < 200){
                            return res.status(400).json({errors: [{message: 'Content should be at least 200 characters.'}]});
                        }
                        if (!categories || categories.length == 0){
                            return res.status(400).json({errors: [{message: 'At least one category is required.'}]});
                        }

                        
                        postFields.title = title;
                        postFields.body = body;
                        postFields.slug = slugify(title).toLowerCase();
                        postFields.excerpt = smartTrim(body, 320, ' ', '...');
                        //Categories
                        arrayOfCategories = categories && categories.split(',');
                        postFields.categories = arrayOfCategories;
                        //TODO Check for the file
                        if (req.file){
                            postFields.photo = req.file.location;
                        }
                        
                        resolve(true);
                    });//post parse
                }); //new post
                try{
                    
                    if (updatedPost){
                      const post = await Post.findByIdAndUpdate(req.params.id,
                        {$set: postFields}, 
                        {new: true}).exec();
                        res.json(post);
                    }else{
                        return res.status(400).json({msg: "This profile does not exits"});
                    }
                }catch(err){
                    console.error(err.message);
                    res.status(400).json({msg: "Somthing went wrong", err: err.message}); 
                }
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error'); 
        }
    });
    

  
    /**
     * Get all current post in db
     */
    router.get('/', async(req, res) => {
        try{
            const posts = await Post.find().populate('categories', ['_id', 'name', 'slug']).populate('postedBy', ['_id', 'username', 'voteCount', 'avatar']);
            res.json(posts);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });
     
    
     /**
      * Get posts by id 
      */
     router.get('/:id', async(req, res) => {
        try{
            const post = await Post.findById(req.params.id).populate('categories', ['_id', 'name', 'slug']).populate('postedBy', ['_id', 'username', 'voteCount', 'avatar']); 
            if(!post){
                return res.status(404).json({msg: 'Post is not fount'});
            }

            //Add a view 
            siteViewsUp.siteViewsUp(req.params.id);
            res.json(post);
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(404).json({msg: 'Post is not fount'});
            }
            res.status(500).send('Server Error');
        }
    });


    /**
     * Delete post by id 
     */
    router.delete('/:id', auth, async(req, res) => {
        try{
            const post = await Post.findById(req.params.id);
            //Check authership of post
            if(post.postedBy.toString() !== req.user.id){
                return res.status(401).json({msg: 'User not authorized'});
            }
            await post.remove();
            res.json({msg: "Post removed"});
        }catch(err){
            console.error(err.message);
            if(err.kind === 'ObjectId'){
                return res.status(404).json({msg: 'Post is not fount'});
            }
            res.status(500).send('Server Error');
        }
    });
    
   
    /**
     * Up Vote/Down vote post
     */
    router.post('/vote/:id', auth, async (req, res) => {
        const { voteType } = req.body;
        try{

            const post = await Post.findById(req.params.id); 
            const user = await User.findById(post.postedBy);
            if (voteType == "up"){
                //if user upvoted the post already
               if (post.upVote.filter(vote => vote.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({errors: [{message: 'You have already up voted this post'}]});
               }
               //If user previusly devoted the post
               if (post.deVote.filter(vote => vote.user.toString() === req.user.id).length > 0){
                    const removeIndex = post.deVote.map(vote => vote.user.toString()).indexOf(req.user.id);
                    post.voteCount += 1
                    post.deVote.splice(removeIndex, 1)
               }

               //Added the user to array of upvotes
               post.upVote.unshift({ user: req.user.id });
               post.voteCount += 1
               await post.save();

            }

            if (voteType == "down"){

                //if user devoted the post already
                if (post.deVote.filter(vote => vote.user.toString() == req.user.id).length > 0){
                    return res.status(400).json({errors: [{message: 'You have already down voted this post'}]});
                }
                //If user previusly up voted the post
                if (post.upVote.filter(vote => vote.user.toString() === req.user.id).length > 0){
                    const removeIndex = post.upVote.map(vote => vote.user.toString()).indexOf(req.user.id);
                    post.voteCount -= 1
                    post.upVote.splice(removeIndex, 1)
                }

                post.deVote.unshift({ user: req.user.id});
                post.voteCount -= 1
                await post.save();
            }
            

            res.json(post.voteCount);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

/**
 * Comment on post
 */
router.post('/comment/:id', [auth, [
    check('text', 'Text is required')
      .not()
      .isEmpty()
      ]
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            author: user.username,
            avatar: user.avatar,
            user: req.user.id
        };

        post.coments.unshift(newComment);
        user.rating += 5;
        await user.save();
        await post.save();
        res.json(post.coments);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

        

    });


    /**
     * Delete existing comment
     */
    router.delete('/comment/:id/:comment_id', auth, async (req, res) => {

        try {

            const post = await Post.findById(req.params.id);
            
            if(!post){
                return res.status(404).json({ msg: "post does not exist" });
              }
            //Pull out a comment 
            const comment = post.coments.find(comment=> comment.id.toString() === req.params.comment_id);
            
            if(!comment) {
                return res.status(404).json({ msg: "comment does not exist" });
            }

            const comntIndex = post.coments.map(comnt=> comnt.id.toString()).indexOf(req.params.comment_id);


            post.coments.splice(comntIndex, 1);
            await post.save();
            res.json(post.coments);

        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

    /**
     * 
     * @param {*} str 
     * @param {*} length 
     * @param {*} delim 
     * @param {*} appendix 
     * Trimmig function for the post excerpt
     */
    const smartTrim = (str, length, delim, appendix) => {
        if (str.length <= length) return str;
    
        var trimmedStr = str.substr(0, length + delim.length);
    
        var lastDelimIndex = trimmedStr.lastIndexOf(delim);
        if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);
    
        if (trimmedStr) trimmedStr += appendix;
        return trimmedStr;
    };



   

module.exports = router;