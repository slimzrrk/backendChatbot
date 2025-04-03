module.exports = (sequelize, DataTypes) => {
  return sequelize.define('CardReservation', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.ENUM('تونس','صفاقس','سوسة','التضامن','القيروان','قابس','بنزرت','أريانة','قفصة','المنستير','مدنين','نابل','القصرين','بن عروس','المهدية','سيدي بوزيد','جندوبة','قبلي','توزر','سليانة','باجة','زغوان','منوبة'),
    user_id: DataTypes.INTEGER,
    level_id: DataTypes.INTEGER,
    phone_number: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    status: DataTypes.ENUM('waiting', 'approved', 'rejected'),
    livraison: DataTypes.ENUM('Yes', 'No'),
    enfant_id: DataTypes.INTEGER
  }, {
    tableName: 'card_reservations',
    timestamps: false
  });
};