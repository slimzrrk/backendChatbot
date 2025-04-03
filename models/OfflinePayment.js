module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OfflinePayment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    bank: DataTypes.STRING(64),
    reference_number: DataTypes.STRING(64),
    attachment: DataTypes.STRING(255),
    status: DataTypes.ENUM('waiting', 'approved', 'reject'),
    pay_date: DataTypes.STRING(64),
    created_at: DataTypes.INTEGER
  }, {
    tableName: 'offline_payments',
    timestamps: false
  });
};