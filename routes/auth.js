const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, surname, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, surname, password: hashedPassword });
      res.status(201).json({ message: 'Kayit başarili.' });

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.json({ token: token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ where: { name: name} });
  console.log(req.body, user)
  if (!user) return res.status(400).json({ message: 'Kullanici bulunamadi.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
        return res.status(400).json({ message: 'Geçersiz şifre.' });
  } else {
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token: token });
        return(res.json({ message: 'Giriş başarili.' }))
  }
});

module.exports = router;





//register da kullanıcı muvecut uyarısı.
//token registerde 
//hataalı girişler için hata mesajları 
//update de mevcut birinin isimlerini yazamasın
