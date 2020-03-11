const express = require('express');
const router = express.Router();
const {User, Register, Login} = require('../models/user');
router.get('/regis', (req, res) => {
    res.render('users/regis.ejs');
})
router.post('/register', async (req, res) => {
    try {
        let {name, email, password} = req.body;
        await Register(name, email, password);
        res.send('Success');  
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

router.post('/login', async (req, res) => {
    try {
        let {email, pasword} = req.body;
        let tokenKey = await Login(email, pasword);
        console.log(tokenKey);
        res.send(tokenKey);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});

module.exports = router;