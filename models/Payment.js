module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Payment', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.BIGINT,
    amount: DataTypes.BIGINT,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    tableName: 'payments',
    timestamps: false
  });
};