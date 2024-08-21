const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const usersHistoryRoutes = require('./routes/usersHistory');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/usersHistory', usersHistoryRoutes);
app.use('/auth', authRoutes);

sequelize.sync().then(() => {
    console.log('Veritabanı senkronize edildi');
    app.listen(3000, () => {
        console.log('Sunucu 3000 portunda çalışıyor');
    });
});