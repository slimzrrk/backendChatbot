module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Card', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    card_key: DataTypes.INTEGER,
    reference: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive'),
    level_id: DataTypes.INTEGER,
    subscribe_id: DataTypes.INTEGER,
    expires_in: DataTypes.INTEGER,
    is_used: DataTypes.BOOLEAN,
    is_printed: DataTypes.BOOLEAN,
    created_at: DataTypes.BIGINT,
    updated_at: DataTypes.BIGINT
  }, {
    tableName: 'cards',
    timestamps: false
  });
};