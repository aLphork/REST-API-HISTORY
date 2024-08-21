const express = require('express');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/modelusers');
const router = express.Router();
const SECRET_KEY = 'supersecretkey';

//login
router.post('/login', async (req, res) => {
    const { name, surname } = req.body;
    const user = await users.findOne({ where: { name, surname } });

    if (user){ 
        const login = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token: login });
    } else {
        return res.status(400).json({ error: 'Kullanıcı bulunamadı' });
    }
    //const isValidPassword = await bcrypt.compare(password, user.password);
    //if (!isValidPassword) return res.status(401).json({ error: 'Geçersiz şifre' });

    
});

/*
const SECRET_KEY = 'supersecretkey';
//register
router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await users.create({ name: name, password: hashedPassword });
        const tokenRegister = jwt.sign({ name: name }, SECRET_KEY, { expiresIn: '1h' });
        res.status(201).json({user: user, token: tokenRegister});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
*/



module.exports = router;