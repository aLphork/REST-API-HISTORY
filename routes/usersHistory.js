const express = require('express');
const userHistory = require('../models/modelHistory');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Tüm kullanıcı geçmişlerini listele.
router.get('/postUser', authenticateToken, async (req, res) => {
    try {
        const histories = await userHistory.findAll();
        res.json(histories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Belirli bir kullanıcıya ait geçmişleri getir.
router.get('/post/:userId', authenticateToken, async (req, res) => {
    try {
        const histories = await userHistory.findAll({ where: { userId: req.params.userId } });
        res.json(histories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;