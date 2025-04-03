module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Accounting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    webinar_id: DataTypes.INTEGER,
    bundle_id: DataTypes.INTEGER,
    meeting_time_id: DataTypes.INTEGER,
    subscribe_id: DataTypes.INTEGER,
    promotion_id: DataTypes.INTEGER,
    registration_package_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    system: DataTypes.BOOLEAN,
    tax: DataTypes.BOOLEAN,
    amount: DataTypes.DECIMAL(13, 2),
    type: DataTypes.ENUM('addiction', 'deduction'),
    type_account: DataTypes.ENUM('income', 'asset', 'subscribe', 'promotion', 'registration_package'),
    store_type: DataTypes.ENUM('automatic', 'manual'),
    referred_user_id: DataTypes.INTEGER,
    is_affiliate_amount: DataTypes.BOOLEAN,
    is_affiliate_commission: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {
    tableName: 'accounting',
    timestamps: false
  });
};