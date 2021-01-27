const express = require('express');
const router = express.Router();
const Post = require('../../models/Posts');


router.get('/:id', async(req, res) => {
    try{
        var data = {};
        const posts = await Post.find({postedBy: req.params.id});
        
        if (!posts){
            return res.status(404).json({msg: 'This user does not have any posts yet'});
        }
        var total_views = 0;
        var total_vote_count = 0;
        var posts_views_data = new Object();
        var posts_vote_data = new Object();
        posts.map(post => {
           total_views += post.views; 
           total_vote_count += post.voteCount;
           posts_views_data[post.title] = post.views;
           posts_vote_data[post.title] = post.voteCount;
            
        });
        data.total_views = total_views;
        data.total_vote_count = total_vote_count;
        data.single_posts_views_stats = posts_views_data;
        data.single_posts_votes_stats = posts_vote_data;
        res.json({"data": data});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});






module.exports = router;