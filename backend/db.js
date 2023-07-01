const {Sequelize} = require('sequelize');


module.exports = new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOSTNAME,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,

        define: {
            freezeTableName: true
        }
    }
);