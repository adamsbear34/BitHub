const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const Coin = require('../../models/Coin');
const Profile = require('../../models/Profile');
const axios = require('axios');
const CoinGecko = require('coingecko-api');
const { model } = require('mongoose');
const CoinGeckoClient = new CoinGecko();

/**
 * Get all coins
 */
router.get('/', async (req, res) => {
    try{
     const data = await CoinGeckoClient.coins.markets({vs_currency: 'usd'});
     
     res.json(data);  
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Get users coins
router.get('/:id', async(req, res) => {
    try{
        const profile =  await Profile.findOne({user: req.params.id});
        var ids = "";
        if(!profile) return res.status(400).json({msg: "User profile not found"});
        profile.coins.map((coin) => (
            ids = ids + coin.coinId + ", "
        ));
        const data = await CoinGeckoClient.coins.markets({vs_currency: 'usd', ids: ids});
        res.json(data); 
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//Get coin by coinId
router.get(`/:coinId`, async (req, res) => {
    try {
        const  data = await CoinGeckoClient.simple.price({ids: `${req.params.coinId}`, vs_currencies: 'usd'});
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//Add to fav
router.post('/addFavorite', [auth], async (req, res) => {
    try{

        const profile = await Profile.findOne({user: req.user.id});
        const {coinId, symbol, name} = req.body;
        if(!profile) return res.status(400).json({msg: "User profile not found"});
        let coin = await Coin.findOne({coinId: coinId});
        if(!coin){
            coin = new Coin({
                coinId: coinId,
                symbol: symbol,
                name: name
            });
            await coin.save();
            profile.coins.unshift(coin);
           await profile.save();
            return res.status(201).json(profile);
        }

        if(profile.coins.filter(c => c.coinId === coinId).length > 0){
            return res.status(400).json({msg: "This coin is already added to profile"});
        }

        profile.coins.unshift(coin);
        await profile.save();
        res.status(201).json(profile.coins);
  

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


//Remove from Fav
router.delete('/:coin_id', [auth], async (req, res) => {
    const coinId = req.params.coin_id;
    try{
        const profile = await Profile.findOne({user: req.user.id});
        if(!profile) return res.status(400).json({msg: "User profile not found"});
    
        if(profile.coins.length === 0){
            return res.status(400).json({"msg": "You have no coins in the list"});
        }else if(profile.coins.filter(coin => coin.coinId === coinId).length == 0){
            return res.status(400).json({"msg": "Coin already been removed"});
        }

        const removeIndex = profile.coins.map(coin => coin.coinId.toString()).indexOf(coinId);
            
        profile.coins.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

   


});





module.exports = router;