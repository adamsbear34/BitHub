const {Router, response} = require('express');
const auth = require('../../middleware/auth');
const router = Router();
const User = require('../../models/user');



router.get('/', auth, async (req, res) => {

    try {
        const user = await  User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
