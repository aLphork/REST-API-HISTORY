
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize( 'mydb', 'root', 'my-secret-pw', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3306, 
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