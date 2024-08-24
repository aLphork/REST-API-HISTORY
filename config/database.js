const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('project', 'root', 'my-secret-pw', {
    host: '172.17.0.2',
    dialect: 'mysql',
    logging: false,
    port: 3306,
    define: {
        timestamps: false
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL bağlantısı başarılı.');
    } catch (error) {
        console.error('Veritabanı bağlantısında hata:', error.message);
    }
})();//dışarıyla iletişime girmeden çalışması.[()()]

module.exports = sequelize;