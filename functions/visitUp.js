const Post = require('../models/Posts');


siteViewsUp = async function(postId){
    try{
        const post = await Post.findByIdAndUpdate(postId, {$inc: {views: 1}}, {new: true});
        console.log(post.views);
        await post.save()

    }catch(err){
        console.log(err);
    }
};


module.exports = {siteViewsUp};