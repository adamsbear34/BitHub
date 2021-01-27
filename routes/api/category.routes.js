const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('../../config/default.json');
const Category = require('../../models/Category');
const Posts = require('../../models/Posts');
const slugify = require('slugify');

//Create new category
router.post('/new', [
    auth,
    [
    check('name').not().isEmpty().withMessage('Name is required')
    ]
], 
async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array});
    }

    const {name} = req.body;

    try{
        let slug = slugify(name).toLowerCase();

        let duplicate = await Category.findOne({slug: slug});

        if (duplicate){
            return res.status(400).json({"error": "Category already existst"});
        }
        
        let category = new Category({
            name: name,
            slug: slug
        });

        await category.save();
        res.json(category);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

   
});




//Get all categiries
router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }


});


//Get category by slug
router.get('/:id', async (req, res)=> {
    const id = req.params.id;

    try {
        const category = await Category.findById(id);
        const posts = await Posts.find({"categories": {
            $elemMatch: { 
                $eq  : category._id 
            }
        }
    });
        console.log(category.slug)
        if (!category || !posts){
          return  res.status(404).json({"error": "No category found"});
        }

        res.json({category, posts});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});






module.exports = router; 