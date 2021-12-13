const router = require('express').Router();
const { User } = require('../model');

router.get('/users', async(req,res) => {
    let users = await User.findAll()
    res.json({users})
});

module.exports = router;
