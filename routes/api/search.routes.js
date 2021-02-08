const { Pinpoint } = require('aws-sdk');
const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');


/**
 * Search route
 * Get all the posts matching search query
 */
router.get('/',  async(req, res)=>{
    try{
        if (req.query.search){
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            const posts = await Post.find({title: regex}).populate('postedBy', ['_id', 'username', 'voteCount', 'avatar']);

            if(!posts){
                return res.status(404).json({msg: 'Nothing was found'});
            }
               
            res.json(posts);
        }
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


/**
 * 
 * @param {*} text 
 * ReGex function
 */
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}



module.exports = router;    