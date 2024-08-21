const express = require('express');
const users = require('../models/modelusers');
const userHistory = require('../models/modelHistory')
const authenticateToken = require('../middleware/auth');
const router = express.Router();



// Tüm kullanıcıları listele
router.get('/getAll', authenticateToken, async (req, res) => {

    try {
        const users = await users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
});

// Belirli bir kullanıcıyı listele.
router.get('/get/:id', authenticateToken, async (req, res) => {
    try {
        const user = await users.findByPk(req.params.id);
        if(user){
            res.json(user);
        } else {
            res.status(404).json({message: 'Kullanıcı bulunamadı.'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Yeni kullanıcı oluştur.
router.post('/newuser', authenticateToken, async (req, res) => {
    try {
        const user = await users.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Kullanıcı güncelle.
router.put('/update/:id', authenticateToken, async (req, res) => {
    try {
        const user = await users.findByPk(req.params.id);
        if(user) {
            await user.update(req.body);
            res.json(user);
            //history için
            await userHistory.create({
                userId: user.id, 
                changeDate: new Date(),
                changeCounter: (user.changeCounter || 0) + 1
            });
        } else {
            res.status(404).json({massage: 'Kullanıcı bulunamadı.'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
})


// Delete Post
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
        const user = await users.findByPk(res.params.id)
        if(user) {
            await user.destroy();
            res.json({ message: 'Kullanıcı silindi.' });
        } else {
            res.status(404).json({message: 'Kullanıcı bulunamadı.' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;