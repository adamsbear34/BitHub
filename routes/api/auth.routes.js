 const {Router, response} = require('express');
 const bcrypt = require('bcryptjs');
 const {check, validationResult} = require('express-validator');
 const User = require('../../models/user');
 const gravatar = require('gravatar');
 const jwt = require('jsonwebtoken');
 const config = require('config');
 const router = Router();


 // /api/auth/register
 router.post(
     '/register', 
     [
        check('username', 'User name is required').not().isEmpty(),
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min lengh for password is 8 symbos').isLength({min: 8})
     ],
     async (req, res) =>{
        const errors = validationResult(req);

                if (!errors.isEmpty){
                    return res.status(400).json({
                        errors: errors.array(),
                        message: "Data entered is incorrect"
                    });
                }
       const {username, email, password} = req.body;         
    try{
        
        //Check for the user
        const candidate = await User.findOne({email});

        if (candidate){
           return res.status(400).json({errors: [{message: 'User with this email already exists'}] });
        }

        //Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        //Encrypt Password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username, 
            email, 
            avatar,
            password: hashedPassword});

        await user.save();

        //Token 
        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(payload, 
            config.get('jwtSecret'), {
                expiresIn: 360000
            },
            (err, token)=> {
                if(err) throw err;
                res.json({token});
            });

        //Register user
        // await user.save();
        // res.json(201).json({message: "User has been created"});

    } catch(e){
        response.status(500).json({errors: [{message: 'Somthing went wrong, try again'}]});
    }
 });

 // /api/auth/login
 router.post(
     '/login', 
     [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password','Enter a password').exists()
     ],
     async (req, res) =>{

    try{

        const errors = validationResult(req);

        if (!errors.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: "Data entered is incorrect"
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({errors: [{message: 'Wrong credentials. Try again'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{message: 'Password do not match. Try again'}]});
        }

        const payload = {
            user:{
                id: user.id
            }
        };

        jwt.sign(payload, 
            config.get('jwtSecret'), {
                expiresIn: 360000
            },
            (err, token)=> {
                if(err) throw err;
                res.json({token});
            });
    

    } catch(e){
        response.status(500).json({message: 'Somthing went wrong, try again'});
    }

});

 module.exports = router;