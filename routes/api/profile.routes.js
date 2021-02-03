const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/user');
const {check, validationResult} = require('express-validator');
const { populate } = require('../../models/user');
const upload = require('../../middleware/file-upload');

const singleUpload = upload.single('image');

//Get current user profile 
router.get('/me', auth, async (req, res) => {


    try {
        const profile = await  Profile.findOne({ user: req.user.id})
        .populate({
            path: "user",
            model: "User",
            select: 'username avatar rating',
            populate: {
                path: 'posts', 
                model:"Post",
                select: "title photo excerpt date"
            }
        });
        
        if (!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//Create or update user profile
router.post(
    '/', 
[
    auth, 
    [
    check('title', 'You title is required').not().isEmpty()
    ]
], 
 async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array});
    }

    const {
        status,
        bio,
        title,
        twitter,
        instagram,
        telegram
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if(bio) profileFields.bio = bio;
    if(title) profileFields.title = title;
    if(status) profileFields.status = status;
   

    profileFields.social = {};
    if(twitter){
        profileFields.social.twitter = twitter;
    }else{
        profileFields.social.twitter = '';
    } 
    if(instagram){
        profileFields.social.instagram = instagram; 
    }else{
        profileFields.social.instagram = ''; 
    }
    if(telegram){
        profileFields.social.telegram = telegram;
    }else{
        profileFields.social.telegram = '';
    } 

    try {
        let profile = await Profile.findOne({user: req.user.id});

        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id}, 
                { $set: profileFields},
                { new:  true}  
            )
            .populate({
                path: "user",
                model: "User",
                select: 'username avatat rating',
                populate: {
                path: 'posts', 
                model:"Post",
                select: "title photo excerpt date"
                }
            });

            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();

        const newProfile = await Profile.findOne({user: req.user.id})
        .populate({
            path: "user",
            model: "User",
            select: 'username avatat rating',
            populate: {
            path: 'posts', 
            model:"Post",
            select: "title photo excerpt date"
            }
        });
        console.log(newProfile);
        res.json(newProfile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

 });


 //Upload Image
 router.post('/image-upload', auth, async (req, res) => {

    try{
        const user = await User.findById(req.user.id);
        if (!user){
           return res.status(404).json({"error": "This user does not exists"});
        }
        const userAvatar = await new Promise(function (resolve, reject){
            singleUpload(req, res, function(err){
                if (err){
                    return res.status(400).json({'errors': err.message});
                }
                user.avatar = req.file.location; 
                resolve(true);
            });
        });

        if (userAvatar){
            await user.save();
        }
        res.json(user.avatar);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 
 });




 //Get All profiles 
 router.get('/', async(req, res) => {

    try {
        const profiles = await Profile.find().populate('user', ['username', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error ');
    }
 });


 //Get All profiles by suer id
 router.get('/user/:user_id', async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.params.user_id })
        .populate({
            path: "user",
            model: "User",
            select: 'username avatar rating',
            populate: {
                path: 'posts', 
                model:"Post",
                select: "title photo excerpt date"
            }
        });

        if(!profile) return res.status(400).json({msg: "Profile not found"});
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: "Profile not found"});
        }
        res.status(500).send('Server Error ');
    }
 });



 //Delete User
 router.delete('/', auth, async(req, res) => {

    try {


        //Remover profile
         await Profile.findOneAndRemove({ user: req.user.id});
        //Remove user
         await Profile.findOneAndRemove({ _id: req.user.id});
        res.json({msg: 'User deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error ');
    }
 });

module.exports = router;