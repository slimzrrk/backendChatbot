const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('abajimdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true, // ou true si tu veux voir les requêtes SQL dans la console
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
